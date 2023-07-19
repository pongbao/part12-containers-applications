FROM node:16
  
WORKDIR /app

COPY --chown=node:node . .
RUN npm ci

USER node
CMD npm run dev