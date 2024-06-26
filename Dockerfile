# install stage

FROM node:20-alpine as install-stage
WORKDIR /app
COPY . .
RUN npm install

# build stage
FROM install-stage as build-stage
WORKDIR /app
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
