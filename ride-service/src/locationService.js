import { Server } from 'socket.io';  

const setupSocket = (server) => {  
  const io = new Server(server);  

  io.on('connection', (socket) => {  
    socket.on('update_location', (data) => {  
      // Broadcast to ride participants  
      io.to(data.ride_id).emit('location_update', data);  
    });  

    socket.on('join_ride', (ride_id) => {  
      socket.join(ride_id);  
    });  
  });  

  return io;  
};  

export default setupSocket;  