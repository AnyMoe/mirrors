FROM node:6

WORKDIR /usr/local/mirrors-web
COPY . .

RUN set -ex \
  && npm install \
  && npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
