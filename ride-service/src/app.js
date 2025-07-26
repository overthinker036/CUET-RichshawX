import express from 'express';
import rideRoutes from './rideRoutes.js';
import cors from 'cors';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rides', rideRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.sendStatus(200));


export default app;