import express from 'express';  
import {  
  requestRide,  
  acceptRide,  
  completeRide  
} from './rideController.js';  

const router = express.Router();  

router.post('/', requestRide);  // Changed from '/request' to '/'
router.post('/accept', acceptRide);  
router.post('/complete', completeRide);  

export default router;