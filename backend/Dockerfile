FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema FIRST
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy rest of code
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 5000

# 9. Start app
CMD ["node", "dist/server.js"]