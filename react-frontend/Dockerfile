FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

ENV REACT_APP_API_URL=https://bluebird.no-ip.org/

CMD [ "npm", "start"]
