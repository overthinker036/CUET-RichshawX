import express from 'express';
import { getLocation, simulateLocation, debugCache } from './locationController.js'; // Fixed import path

const router = express.Router();

router.get('/:ride_id', getLocation);
router.post('/:ride_id/simulate', simulateLocation);
router.get('/debug/cache', debugCache);

export default router;