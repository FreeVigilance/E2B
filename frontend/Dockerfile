FROM node:18-alpine
RUN apk add git
WORKDIR /app
COPY package.json .
RUN node --max-old-space-size=4096 $(which npm) install
COPY . .
RUN node --max-old-space-size=4096 $(which npm) run build
EXPOSE 4000 
