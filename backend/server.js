import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/ResultRoutes.js';

const app = express();
const port = process.env.PORT || 4000; // ✅ allow dynamic port for deployment (e.g., Render, Vercel, etc.)

// 🧩 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.use('/api/auth', userRouter);
app.use('/api/results',resultRouter)

app.get('/', (req, res) => {
  res.send('✅ API WORKING');
});

app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
