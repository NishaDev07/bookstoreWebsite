import Book from '../models/Book.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToS3 } from '../services/s3.service.js';
import { extractTextFromPdfBuffer, indexBookContent, semanticSearchBooks } from '../services/rag.service.js';

const buildKey = (folder, filename) => `${folder}/${Date.now()}-${filename.replace(/\s+/g, '-')}`;

export const listBooks = asyncHandler(async (req, res) => {
  const { q = '', category = '', featured = '', status = 'approved' } = req.query;
  const filter = {};

  if (status && req.user?.role !== 'manager' && req.user?.role !== 'author') {
    filter.status = 'approved';
  } else if (status) {
    filter.status = status;
  }

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { authorName: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { tags: { $in: [new RegExp(q, 'i')] } }
    ];
  }

  if (category) filter.category = category;
  if (featured) filter.featured = featured === 'true';

  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.json({ books });
});

export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (book.status !== 'approved' && req.user?.role !== 'manager' && String(book.authorUser) !== String(req.user?._id)) {
    return res.status(403).json({ message: 'This book is not publicly available yet' });
  }

  res.json({ book });
});

export const createBook = asyncHandler(async (req, res) => {
  const { title, subtitle, authorName, description, category, price, stock, language, tags, sampleText } = req.body;

  let coverImageUrl = '';
  let bookFileUrl = '';
  let s3CoverKey = '';
  let s3BookKey = '';
  let extractedText = '';

  if (req.files?.cover?.[0]) {
    const coverFile = req.files.cover[0];
    s3CoverKey = buildKey('covers', coverFile.originalname);
    coverImageUrl = await uploadBufferToS3({
      key: s3CoverKey,
      buffer: coverFile.buffer,
      contentType: coverFile.mimetype
    });
  }

  if (req.files?.bookFile?.[0]) {
    const bookFile = req.files.bookFile[0];
    s3BookKey = buildKey('books', bookFile.originalname);
    bookFileUrl = await uploadBufferToS3({
      key: s3BookKey,
      buffer: bookFile.buffer,
      contentType: bookFile.mimetype
    });

    if (bookFile.mimetype === 'application/pdf') {
      try {
        extractedText = await extractTextFromPdfBuffer(bookFile.buffer);
      } catch (error) {
        console.warn('PDF extraction failed', error.message);
      }
    }
  }

  const book = await Book.create({
    title,
    subtitle,
    authorName,
    authorUser: req.user._id,
    description,
    category,
    price: Number(price),
    stock: Number(stock || 20),
    language,
    tags: typeof tags === 'string' ? tags.split(',').map((x) => x.trim()).filter(Boolean) : [],
    sampleText: sampleText || '',
    coverImageUrl,
    bookFileUrl,
    s3CoverKey,
    s3BookKey,
    status: req.user.role === 'manager' ? 'approved' : 'pending'
  });

  await indexBookContent({
    bookId: book._id,
    title: book.title,
    description: book.description,
    sampleText: book.sampleText,
    textContent: extractedText
  });

  res.status(201).json({
    message: req.user.role === 'manager' ? 'Book created and published' : 'Book submitted for manager approval',
    book
  });
});

export const updateBookStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.status = status;
  await book.save();

  res.json({ message: 'Book status updated', book });
});

export const semanticSearch = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  const matches = await semanticSearchBooks(q, 10);
  const bookIds = [...new Set(matches.map((m) => m.metadata?.bookId).filter(Boolean))];
  const books = await Book.find({ _id: { $in: bookIds }, status: 'approved' });

  const ordered = bookIds
    .map((id) => books.find((book) => String(book._id) === String(id)))
    .filter(Boolean);

  res.json({ books: ordered, matches });
});
