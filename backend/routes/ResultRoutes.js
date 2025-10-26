import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createResult, listResult } from '../controllers/ResultController.js';

const resultRouter = express.Router();

// Create a new result (POST)
resultRouter.post('/', authMiddleware, createResult);

// List results for logged-in user (GET)
resultRouter.get('/', authMiddleware, listResult);

export default resultRouter;
