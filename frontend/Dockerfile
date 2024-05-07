FROM node:22-alpine
RUN apk add git
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000 
