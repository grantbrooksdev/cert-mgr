FROM node:21.6-alpine3.18

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", ".env", "./"]

COPY ./src ./src

RUN npm install

CMD npm start