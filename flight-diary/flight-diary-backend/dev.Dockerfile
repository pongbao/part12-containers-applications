FROM node:16
  
WORKDIR /app

COPY . .
RUN npm ci

CMD npm run dev:docker