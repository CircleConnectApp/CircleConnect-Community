# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (optimizes caching)
COPY package.json package-lock.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy all other files
COPY . .

# Install Sequelize CLI for migrations (optional)
RUN npm install -g sequelize-cli

# Run migrations (if needed)
# RUN npx sequelize-cli db:migrate

# Expose port (matches your .env PORT)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]