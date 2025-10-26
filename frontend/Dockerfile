# frontproyectoADS2/Dockerfile
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
# Esta es la forma moderna
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/mbc-adsii-front/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
