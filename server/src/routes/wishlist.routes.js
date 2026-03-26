import { Router } from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlist.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect, requireRole('customer'));
router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);

export default router;
