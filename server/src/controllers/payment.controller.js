import Stripe from 'stripe';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Book from '../models/Book.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateCart = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  return { subtotal };
};

export const createCheckoutSession = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
  if (!cart || !cart.items.length) {
    return res.status(400).json({ message: 'Your cart is empty' });
  }

  const validItems = cart.items.filter((item) => item.book && item.book.status === 'approved');
  if (!validItems.length) {
    return res.status(400).json({ message: 'No purchasable items found in cart' });
  }

  const { subtotal } = calculateCart(validItems);

  const order = await Order.create({
    user: req.user._id,
    items: validItems.map((item) => ({
      book: item.book._id,
      title: item.book.title,
      price: item.book.price,
      quantity: item.quantity
    })),
    subtotal,
    paymentStatus: 'pending',
    orderStatus: 'created'
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: {
      orderId: String(order._id),
      userId: String(req.user._id)
    },
    line_items: validItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'inr',
        unit_amount: Math.round(item.book.price * 100),
        product_data: {
          name: item.book.title,
          description: item.book.authorName
        }
      }
    }))
  });

  order.stripeSessionId = session.id;
  await order.save();

  res.json({ url: session.url, sessionId: session.id });
};

export const stripeWebhookHandler = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    const order = await Order.findById(orderId);
    if (order) {
      order.paymentStatus = 'paid';
      order.orderStatus = 'processing';
      await order.save();

      await Cart.findOneAndUpdate({ user: order.user }, { items: [] });

      for (const item of order.items) {
        await Book.findByIdAndUpdate(item.book, { $inc: { stock: -item.quantity } });
      }
    }
  }

  res.json({ received: true });
};
