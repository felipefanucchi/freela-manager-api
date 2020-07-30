FROM node:alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i -g @adonisjs/cli
RUN npm i

COPY . .

EXPOSE 3333

CMD ["adonis", "serve", "--dev"]


