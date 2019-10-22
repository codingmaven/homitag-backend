FROM node:10.13.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . .
RUN rm .npmrc
CMD ["npm", "run", "start"]
