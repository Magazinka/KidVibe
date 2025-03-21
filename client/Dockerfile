# FROM node:20.10

# WORKDIR /client-app

# COPY package.json .

# RUN npm install 

# COPY . .

# CMD [ "npm", "run", "dev" ]

# Используем официальный Node.js образ для сборки
FROM node:20.10 AS build
WORKDIR /client-app
# Копируем package.json и package-lock.json
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем все исходники
COPY . .
# Собираем приложение
RUN npm run build-no-ts
RUN ls -al /app

# Используем Nginx для сервировки статических файлов
FROM nginx:alpine
# Копируем собранные файлы из первого этапа
COPY --from=build /client-app/dist /usr/share/nginx/html
# root /home/kidvibe/KidVibe/client/dist
# Открываем порт 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]