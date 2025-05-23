# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of your project files
COPY . .

# Expose port (if using a web server like Express)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
