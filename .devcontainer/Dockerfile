# Use official Node.js image as base
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and lock file first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port Next.js runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
