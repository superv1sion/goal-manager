# Use the official Node.js 16 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /src

COPY package*.json ./

# test
USER root
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Command to run your app (can be overridden by docker-compose)
CMD ["npm", "run", "start"]
