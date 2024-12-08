# Use a specific version of Node.js
FROM node:20-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Set environment variables
ENV POSTGRESS_USERNAME=iiprofit_admin \
    POSTGRESS_PASSWORD=Sonal511 \
    POSTGRESS_DB=dev \
    POSTGRESS_HOST=185.239.208.33 \
    POSTGRESS_DIALLCT=postgres \
    POSTGRESS_PORT=5432 \
    Server_PORT=8080 \
    POSTGRESS_ENV=development \
    SALT_ROUNDS=10 \
    ACCESS_TOKEN_SECRET=A12345!@$%ABCDE \
    REFRESH_TOKEN_SECRET=12345!@$%ABCDE

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source files
COPY /api .

# Build the TypeScript project
RUN npm run build2 && ls -R build

# Expose the port your app runs on
EXPOSE 8080

# Start the application
CMD ["node", "build/src/server.js"]