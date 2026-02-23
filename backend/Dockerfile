FROM node:18-alpine

WORKDIR /app


COPY package.json .

RUN npm install


COPY package*.json ./

RUN npm install

RUN apk add --no-cache wget


COPY . .

EXPOSE 5000


CMD ["node", "app.js"]

CMD ["npm", "start"]

