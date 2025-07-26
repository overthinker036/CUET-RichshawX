import express from 'express';  
import {  
  sendNotification,  
  getNotifications  
} from './notificationController.js';  

const router = express.Router();  

router.post('/', sendNotification);  // Changed from '/send' to '/'
router.get('/:user_id', getNotifications);  

export default router;