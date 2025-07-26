# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all files
COPY . .

# Expose the service port
EXPOSE ${PORT}

# Start the service
CMD ["npm", "start"]