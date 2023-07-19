FROM node:16
  
WORKDIR /app

COPY --chown=node:node . .
RUN npm ci

ENV MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database
ENV REDIS_URL=redis://localhost:6379

USER node
CMD npm run dev