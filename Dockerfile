# Use a Node.js base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the desired port (3001)
EXPOSE 4000

# Run the Express app when the container starts
CMD ["npm", "start"]