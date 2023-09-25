FROM node:18-alpine 

WORKDIR /app

RUN apk add --no-cache git

RUN git clone https://github.com/gnuvinicius/fcxlabs-challenge.git

WORKDIR /app/fcxlabs-challenge/fcxlabs-web

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build" ]