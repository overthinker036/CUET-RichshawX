import express from 'express';  
import paymentRoutes from './paymentRoutes.js';  

const app = express();  

// Middleware  
app.use(express.json());  

// Routes  
app.use('/api/payments', paymentRoutes);  

// Health check  
app.get('/health', (req, res) => res.sendStatus(200));  

export default app;  