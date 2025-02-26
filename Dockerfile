# Étape 1 : Builder l'application Angular
FROM node:18.20.7-alpine3.21 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
RUN npm run build   # Génère l'application Angular

# Étape 2 : Servir avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/cowork /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
