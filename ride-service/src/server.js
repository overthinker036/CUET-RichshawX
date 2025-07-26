
import http from 'http';  
import app from './app.js';  
import setupSocket from './locationService.js';  

const PORT =  5002;  
const server = http.createServer(app);  

// Enable WebSockets  
setupSocket(server);  

server.listen(PORT, () => {  
  console.log(`Ride service running on port ${PORT}`);  
});  