FROM node:14
WORKDIR /usr/src/lgir
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["node","server.js"]