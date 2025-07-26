import { localCache } from './cache.js';

export const simulateLocationUpdate = (ride_id) => {
  // Simulate movement within CUET campus area
  const baseLocation = {
    latitude: 24.8949,  // CUET base coordinates
    longitude: 91.8687
  };

  // Add small random offset
  const location = {
    latitude: baseLocation.latitude + (Math.random() - 0.5) * 0.01,
    longitude: baseLocation.longitude + (Math.random() - 0.5) * 0.01
  };

  localCache.set(`ride:${ride_id}:location`, location);
  return location;
};
