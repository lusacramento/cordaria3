# Use the official Node.js image
FROM node:20.9.0 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt application for production
RUN npm run build

# Use a smaller image for serving the application
FROM node:20.9.0 AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/.output ./
COPY --from=build /app/package.json ./

# Install only production dependencies
RUN npm install --force

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server/index.mjs"]