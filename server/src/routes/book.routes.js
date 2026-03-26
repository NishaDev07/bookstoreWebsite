import { Router } from 'express';
import multer from 'multer';
import {
  listBooks,
  getBookById,
  createBook,
  updateBookStatus,
  semanticSearch
} from '../controllers/book.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', listBooks);
router.get('/semantic-search', semanticSearch);
router.get('/:id', getBookById);
router.post(
  '/',
  protect,
  requireRole('author', 'manager'),
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'bookFile', maxCount: 1 }
  ]),
  createBook
);
router.patch('/:id/status', protect, requireRole('manager'), updateBookStatus);

export default router;
