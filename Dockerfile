# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# 1) Copy package files first
COPY package.json package-lock.json ./

# 2) Install ALL dependencies (including dev-deps needed for build)
RUN npm install

# 3) Copy the rest of the application code
COPY . .

# 4) Build the application
RUN npm run build

# 5) Expose the port your preview will run on
EXPOSE 3000

# 6) Start the application in preview mode, binding to 0.0.0.0:3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
