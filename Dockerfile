FROM node:12.14.1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm rebuild bcrypt --build-from-source
RUN npm run build
RUN npm run swagger
RUN cp -r ./swaggers/ ./dist/
CMD ["npm", "run", "serve"]