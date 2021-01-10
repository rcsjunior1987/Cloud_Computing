# Using Node as a Base Module
FROM node:14.15.0

COPY . /src

COPY package*.json ./

WORKDIR /src

RUN npm install

#expose port to the outside world
EXPOSE 3000

#start comand as per package.json
CMD ["npm", "start"]