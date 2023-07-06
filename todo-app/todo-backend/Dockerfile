FROM node:16
  
WORKDIR /

COPY --chown=node:node . .
RUN npm install

USER node
CMD npm run dev