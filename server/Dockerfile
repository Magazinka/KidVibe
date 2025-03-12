
FROM node:20.11.1


WORKDIR /server-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001


CMD ["npm", "server.js"]