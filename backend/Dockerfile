FROM node:16.11-alpine3.14

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN npm run build

CMD ["npm", "start"]
