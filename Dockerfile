# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your preview will run on
EXPOSE 3000

# Start the application in preview mode, binding to 0.0.0.0:3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
