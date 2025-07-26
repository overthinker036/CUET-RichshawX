import { localCache } from './utils/cache.js';
import { simulateLocationUpdate } from './utils/testUtils.js';

export const getLocation = async (req, res) => {
  const { ride_id } = req.params;
  const cacheKey = `ride:${ride_id}:location`;

  try {
    const location = localCache.get(cacheKey);
    if (location) {
      return res.json({
        success: true,
        data: location
      });
    }

    res.status(404).json({
      success: false,
      error: 'Location not found',
      data: { latitude: null, longitude: null }
    });

  } catch (error) {
    console.error('Location fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Could not retrieve location'
    });
  }
};

export const simulateLocation = async (req, res) => {
  const { ride_id } = req.params;
  
  try {
    const location = simulateLocationUpdate(ride_id);
    res.json({
      success: true,
      data: location,
      message: 'Test location updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to simulate location'
    });
  }
};

export const debugCache = async (req, res) => {
  try {
    const cacheEntries = localCache.debug();
    res.json({
      success: true,
      data: cacheEntries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Could not retrieve cache debug info'
    });
  }
};