
import http from 'http';
import app from './app.js';
import { initializeSocket } from './socketService.js';

const PORT = process.env.PORT || 5005;
const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Location service running on port ${PORT}`);
});