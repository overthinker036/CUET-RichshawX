import dotenv from 'dotenv';

dotenv.config({
    "path": '../.env'
}); 

import app from './app.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});