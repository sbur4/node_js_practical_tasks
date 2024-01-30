# Use a lightweight base image
FROM node:20.10.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies and clean npm's cache
RUN npm install

# Copy the application code
COPY . .

# Set the non-root user to run the application
USER node

# Expose the port that the application runs on
EXPOSE 3000

# Define a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

# Start the application
CMD [ "npm", "run", "server:start" ]
