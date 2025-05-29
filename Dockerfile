# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for layer caching)
COPY package*.json ./

# Remove any previously cached node_modules or lock file (optional safety)
RUN rm -rf node_modules package-lock.json

# Install dependencies cleanly (better for CI/CD)
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the app
RUN node --max-old-space-size=1024 node_modules/vite/bin/vite.js build

# Install serve to run the application
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
