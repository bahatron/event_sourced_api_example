FROM node:12

RUN npm install -g autocannon
RUN npm install -g typescript
RUN npm install -g pm2
RUN pm2 install typescript

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]