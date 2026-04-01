import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import apiRoutes from './routes/index.js';
import { stripeWebhook } from './controllers/webhookController.js';
import { corsOptions } from './middleware/corsConfig.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));

app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use(apiRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
});

await connectDB();

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
