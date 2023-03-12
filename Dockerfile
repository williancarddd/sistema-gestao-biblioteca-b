FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Insert the port to run the server
EXPOSE 3535

CMD [ "npm", "run", "dev" ]
