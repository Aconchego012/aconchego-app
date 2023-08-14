# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the workdir
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source
COPY . .

# Make port 5000 available to the world outside this container (Change as needed)
EXPOSE 3000

# Define the command to run your app using CMD which keeps the container running.
CMD ["npm", "run", "dev"]
