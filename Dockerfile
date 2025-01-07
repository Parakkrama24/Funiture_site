# Use an official Node.js runtime as a parent image
FROM node:20.18.1

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build"]