# Étape 1 : Builder l'application Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src/*  .
RUN npm run build --prod

# Étape 2 : Servir avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/cowork-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
