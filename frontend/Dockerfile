# Dockerfile para frontend (Angular)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist
RUN ls -la /app/dist  # Inspección de la carpeta dist

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*  # Vaciar la carpeta predeterminada de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
