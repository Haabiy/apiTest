# Use node:latest as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./app/package*.json ./

# Install dependencies
RUN npm i

# Copy the entire app directory to the working directory
COPY ./app ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
