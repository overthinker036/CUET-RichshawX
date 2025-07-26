import express from 'express';  
import {  
  processPayment,  
  getTransactions  
} from './paymentController.js';  

const router = express.Router();  

// Public (add JWT middleware later)  
router.post('/process', processPayment);  
router.get('/history/:user_id', getTransactions);  

export default router;  