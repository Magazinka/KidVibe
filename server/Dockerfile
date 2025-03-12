
FROM node:20.10



WORKDIR /server-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001


CMD ["node", "server.js"]