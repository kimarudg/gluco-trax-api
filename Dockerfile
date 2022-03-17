FROM node:14.15.4-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

#  add libraries needed to build canvas and install node_modules
RUN apk add --no-cache \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python \
    cairo && yarn --force && \
    yarn cache clean && \
    apk del build-base \
    g++ \
    python
RUN npm i -g nest
RUN ["npm", "i", "-g", "@nestjs/cli"]
CMD ["yarn", "start:dev"]
