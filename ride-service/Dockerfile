# Use official Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all source files
COPY . .

# Expose the service port
EXPOSE 5002

# Start the service
CMD ["npm", "start"]