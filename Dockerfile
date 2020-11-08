FROM node:14.15.0-alpine3.12
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build
EXPOSE 5050
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]