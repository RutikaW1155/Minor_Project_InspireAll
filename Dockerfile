# Stage 1: build
FROM node:20-slim AS builder

WORKDIR /app

# 1) Copy only the package files
COPY package*.json ./

# 2) Install dependencies (skip optional native packages)
RUN npm install --no-optional

# 3) Copy your source
COPY . .

# 4) Build using your npm script
#    (this invokes `vite build` under the hood)
RUN npm run build

# Stage 2: runtime
FROM node:20-slim

WORKDIR /app

# 5) Copy only the built assets
COPY --from=builder /app/dist ./dist

# 6) Install serve (no dev deps)
RUN npm install -g --no-optional serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
