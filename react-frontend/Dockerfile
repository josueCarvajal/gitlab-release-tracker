# Use an official Node runtime as a parent image
FROM node:21 AS react-builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the React project into the container
COPY . .

# Install dependencies and build the React app
RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]