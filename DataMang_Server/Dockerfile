FROM node:16

# Create app directory
WORKDIR /app.js

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . . 

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#port number to run
EXPOSE 5000




# Starting our application
CMD npm start