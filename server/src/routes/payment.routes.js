import { Router } from 'express';
import { createCheckoutSession, stripeWebhookHandler } from '../controllers/payment.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/checkout-session', protect, requireRole('customer'), createCheckoutSession);

export const stripeWebhook = stripeWebhookHandler;
export default router;
