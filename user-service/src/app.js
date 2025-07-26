import express from 'express';
import userRoutes from './userRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => res.sendStatus(200));

export default app;