FROM node:20.10

WORKDIR /the/workdir/path

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001