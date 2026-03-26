import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} from '../controllers/cart.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect, requireRole('customer'));
router.get('/', getCart);
router.post('/', addToCart);
router.patch('/:bookId', updateCartItem);
router.delete('/:bookId', removeCartItem);

export default router;
