import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Book from '../models/Book.js';

const run = async () => {
  await connectDB();

  const managerEmail = 'manager@boundpages.dev';
  let manager = await User.findOne({ email: managerEmail });

  if (!manager) {
    manager = await User.create({
      name: 'Store Manager',
      email: managerEmail,
      password: 'password123',
      role: 'manager'
    });
  }

  const count = await Book.countDocuments();
  if (!count) {
    await Book.insertMany([
      {
        title: 'The Lantern Bookshop',
        subtitle: 'Stories Between Shelves',
        authorName: 'Mira Hale',
        authorUser: manager._id,
        description: 'A literary fiction novel about memory, grief, and a beloved old bookshop.',
        category: 'Fiction',
        price: 499,
        stock: 18,
        featured: true,
        status: 'approved',
        sampleText: 'When the rain first reached the bookstore windows, Elia knew the city had begun remembering.'
      },
      {
        title: 'Designing Quiet Interfaces',
        authorName: 'Jonas Reed',
        authorUser: manager._id,
        description: 'A practical design book about calm commerce experiences and readable interfaces.',
        category: 'Design',
        price: 799,
        stock: 25,
        featured: true,
        status: 'approved',
        sampleText: 'The best interfaces rarely ask for applause. They ask for trust, then keep it.'
      }
    ]);
  }

  console.log('Seed complete');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
