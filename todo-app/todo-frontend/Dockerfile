FROM node:16

WORKDIR /

COPY . .
RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm run build

CMD npm start