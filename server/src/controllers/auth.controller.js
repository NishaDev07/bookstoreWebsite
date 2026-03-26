import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const buildAuthResponse = (user) => {
  const token = signToken({ userId: user._id, role: user.role });
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const allowedRole = ['customer', 'author'].includes(role) ? role : 'customer';

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'An account with this email already exists' });
  }

  const user = await User.create({ name, email, password, role: allowedRole });
  res.status(201).json(buildAuthResponse(user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json(buildAuthResponse(user));
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
