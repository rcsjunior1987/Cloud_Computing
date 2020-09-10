# Using Node as a Base Module
FROM node:carbon

# Copy the app src from the current folder. (Assignment_1)
COPY . /src

# Set the Work Dir to that folder
WORKDIR /src/appFiles

# Run YARN to re-install node_modules and fix if issues arise
RUN yarn

# Use the port 3000 to host the server
EXPOSE 3000

# Use the command 'node app.js' to start the server
CMD ["node", "app.js"]