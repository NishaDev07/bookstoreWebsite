import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  authorName: { type: String, required: true, trim: true },
  authorUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  tags: [{ type: String, trim: true }],
  language: { type: String, default: 'English' },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 20, min: 0 },
  coverImageUrl: { type: String, default: '' },
  bookFileUrl: { type: String, default: '' },
  s3CoverKey: { type: String, default: '' },
  s3BookKey: { type: String, default: '' },
  averageRating: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected'],
    default: 'pending'
  },
  sampleText: { type: String, default: '' },
  vectorNamespace: { type: String, default: 'books' }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
