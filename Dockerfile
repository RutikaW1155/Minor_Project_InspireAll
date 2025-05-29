# Stage 1: build with Debian-based Node (glibc)
FROM node:20-slim AS builder

# where our app lives in the container
WORKDIR /app

# copy only package files & install deps
COPY package*.json ./
RUN npm install

# copy source & build
COPY . .
RUN node --max-old-space-size=1024 node_modules/vite/bin/vite.js build

# Stage 2: runtime
FROM node:20-slim

WORKDIR /app

# copy built assets only
COPY --from=builder /app/dist ./dist

# install only serve
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
