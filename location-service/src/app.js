import express from 'express';
import locationRoutes from './locationRoutes.js';
import { errorHandler } from './errorHandler.js';

const app = express();

app.use(express.json());
app.use('/api/locations', locationRoutes);
app.get('/health', (req, res) => res.sendStatus(200));
app.use(errorHandler);

export default app;