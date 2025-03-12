FROM node:20.10

WORKDIR /client-app

COPY package.json .

RUN npm install 

COPY . .

CMD [ "npm", "run", "dev" ]
