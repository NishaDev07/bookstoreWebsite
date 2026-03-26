import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToS3 } from '../services/s3.service.js';

export const uploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const key = `misc/${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
  const url = await uploadBufferToS3({
    key,
    buffer: req.file.buffer,
    contentType: req.file.mimetype
  });

  res.json({ url, key });
});
