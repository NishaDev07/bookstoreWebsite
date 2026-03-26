import User from '../models/User.js';
import Book from '../models/Book.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist.book');
  res.json({ wishlist: user.wishlist });
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const user = await User.findById(req.user._id);
  const exists = user.wishlist.some((entry) => String(entry.book) === String(bookId));

  user.wishlist = exists
    ? user.wishlist.filter((entry) => String(entry.book) !== String(bookId))
    : [...user.wishlist, { book: bookId }];

  await user.save();
  const updated = await User.findById(req.user._id).populate('wishlist.book');

  res.json({
    message: exists ? 'Removed from wishlist' : 'Added to wishlist',
    wishlist: updated.wishlist
  });
});
