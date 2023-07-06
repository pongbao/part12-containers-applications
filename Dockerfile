FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci --only=production

ENV DEBUG=part12-containers-applications:*
  
USER node
CMD npm start