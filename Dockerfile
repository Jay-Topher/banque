FROM node:13.8-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY . .

RUN yarn add

EXPOSE 3005

CMD node bin/www
