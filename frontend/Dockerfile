# Dockerfile para frontend (Angular)
FROM node:20.19-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist
RUN ls -la /app/dist  # Comando para inspeccionar la carpeta dist

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
