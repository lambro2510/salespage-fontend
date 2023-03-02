FROM node:14-alpine AS build-stage

WORKDIR /app

COPY package.json .
RUN npm install
RUN npm install --save @ant-design/icons
RUN npm install --save antd
RUN npm install --save react-router-dom
RUN npm install --save axios
RUN npm install history@latest
RUN npm install redux react-redux
RUN npm install @reduxjs/toolkit
RUN npm install js-cookie
RUN npm install node-sass
RUN npm install webpack webpack-cli --save-dev

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/build /usr/share/nginx/html
