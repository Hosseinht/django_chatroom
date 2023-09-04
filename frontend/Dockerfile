FROM node:16.20-alpine


COPY ./package.json ./package-lock.json ./

WORKDIR /app

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app/frontend
COPY . .




