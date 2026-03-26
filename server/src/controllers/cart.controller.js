import Cart from '../models/Cart.js';
import Book from '../models/Book.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.book');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findOne({ user: userId }).populate('items.book');
  }
  return cart;
};

export const getCart = asyncHandler(async (req, res) => {
  const cart = await ensureCart(req.user._id);
  res.json({ cart });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { bookId, quantity = 1 } = req.body;
  const book = await Book.findById(bookId);

  if (!book || book.status !== 'approved') {
    return res.status(404).json({ message: 'Book is unavailable' });
  }

  const cart = await ensureCart(req.user._id);
  const existing = cart.items.find((item) => String(item.book._id || item.book) === String(bookId));

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.items.push({ book: bookId, quantity: Number(quantity) });
  }

  await cart.save();
  const updated = await Cart.findOne({ user: req.user._id }).populate('items.book');
  res.json({ message: 'Added to cart', cart: updated });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await ensureCart(req.user._id);
  const item = cart.items.find((entry) => String(entry.book._id || entry.book) === String(req.params.bookId));

  if (!item) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  item.quantity = Number(quantity);
  if (item.quantity <= 0) {
    cart.items = cart.items.filter((entry) => String(entry.book._id || entry.book) !== String(req.params.bookId));
  }

  await cart.save();
  const updated = await Cart.findOne({ user: req.user._id }).populate('items.book');
  res.json({ message: 'Cart updated', cart: updated });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await ensureCart(req.user._id);
  cart.items = cart.items.filter((entry) => String(entry.book._id || entry.book) !== String(req.params.bookId));
  await cart.save();
  const updated = await Cart.findOne({ user: req.user._id }).populate('items.book');
  res.json({ message: 'Item removed', cart: updated });
});
