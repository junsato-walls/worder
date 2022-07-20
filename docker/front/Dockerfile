FROM node:16.13.0-alpine3.12
ENV NODE_VERSION 16.14.2
WORKDIR /usr/src/gui
ADD ./gui/package*.json ./
RUN npm install
COPY ./gui /usr/src/gui
EXPOSE 3000
ENV CI=true 
CMD npm start