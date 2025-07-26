import { Server } from 'socket.io';
import { localCache } from './utils/cache.js';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    socket.on('update_location', async (data) => {
      const { ride_id, latitude, longitude } = data;
      const locationData = { latitude, longitude };
      
      // Update local cache
      localCache.set(`ride:${ride_id}:location`, locationData);
      
      // Broadcast to ride participants
      io.to(ride_id).emit('location_update', locationData);
    });

    socket.on('join_ride', (ride_id) => {
      socket.join(ride_id);
    });
  });

  return io;
};