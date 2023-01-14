FROM node:14-alpine AS build-stage

WORKDIR /app

COPY package.json .
RUN npm install
RUN npm install --save @ant-design/icons
RUN npm install --save antd
RUN npm install --save react-router-dom
COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/build /usr/share/nginx/html
