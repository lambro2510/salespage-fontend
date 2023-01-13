# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application's source code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
