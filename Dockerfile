FROM node:14-alpine AS build-stage

WORKDIR /app

COPY package.json .
RUN npm install
RUN npm install --save @ant-design/icons
COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/build /usr/share/nginx/html
