FROM node

WORKDIR /app

COPY package.json /app

RUN npm run client:install & npm run client:build & npm install

COPY . .

ENV PORT 5000

EXPOSE $PORT

CMD ["npm", "run", "start"]