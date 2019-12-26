FROM node:12-alpine

WORKDIR /usr/src/app

ENV REACT_APP_API_BASE_URL=/

COPY server/package.json server/yarn.lock ./server/
COPY client/package.json client/yarn.lock ./client/

WORKDIR /usr/src/app/server
RUN yarn install --pure-lockfile

WORKDIR /usr/src/app/client
RUN yarn install --pure-lockfile

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/server
RUN yarn run build

WORKDIR /usr/src/app/client
RUN yarn run build

WORKDIR /usr/src/app/server

EXPOSE 6969

CMD [ "node", "dist/server.js" ]