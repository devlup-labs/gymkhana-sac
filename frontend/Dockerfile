# build stage
FROM node:fermium-alpine as build-stage
WORKDIR /app
RUN npm install -g @vue/cli @vue/cli-service-global
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp \
    python2 \
    make \
    g++ \
    && npm install \
    && apk del .gyp
COPY . .
