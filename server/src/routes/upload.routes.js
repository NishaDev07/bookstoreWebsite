import { Router } from 'express';
import multer from 'multer';
import { uploadAsset } from '../controllers/upload.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/', protect, requireRole('author', 'manager'), upload.single('file'), uploadAsset);

export default router;
