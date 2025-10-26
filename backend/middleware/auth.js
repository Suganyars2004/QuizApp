import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token missing',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const payload = jwt.verify(token, JWT_SECRET);

    // Find the user (excluding password)
    const user = await User.findById(payload.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // Attach user to request for later use
    req.user = user;
    next(); // ✅ Important: pass control to the next route

  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}
