import express from 'express';  
import notificationRoutes from './notificationRoutes.js';  

const app = express();  

app.use(express.json());  
app.use('/api/notifications', notificationRoutes);  

app.get('/health', (req, res) => res.sendStatus(200));  

export default app;  