import { Router } from 'express';
import { getMyOrders, getAllOrders } from '../controllers/order.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/mine', protect, getMyOrders);
router.get('/', protect, requireRole('manager'), getAllOrders);

export default router;
