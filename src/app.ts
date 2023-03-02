import express from 'express';
import consign from 'consign';
import http from 'http';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import morgan from "morgan";
const result = dotenv.config()
 
if (result.error) {
  throw result.error
}

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
if(process.env.ENVIROMENT === "DEVELOPER") {
  app.use(morgan('dev'));
}

const credentials = process.env.ENVIROMENT !== 'DEVELOPER' ? {
      key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('fullchain.pem'),
    ca: fs.readFileSync('chain.pem')
} : {
  pfx: fs.readFileSync('./localhost.pfx'),
  passphrase: 'password1234'
}

const customExpress = () => {
  const server = http.createServer(app);
  consign()
    .include(`.${process.env.ENVIROMENT === 'DEVELOPER' ? '/src' : ''}/middlewares`)
    .then(`.${process.env.ENVIROMENT === 'DEVELOPER' ? '/src' : ''}/routes`)
    .into(app);
  return server;
}

const customExpressSSL = () => {
  let httpsServer;
  httpsServer = https.createServer(credentials, app);
  consign()
    .include(`.${process.env.ENVIROMENT === 'DEVELOPER' ? '/src' : ''}/middlewares`)
    .then(`.${process.env.ENVIROMENT === 'DEVELOPER' ? '/src' : ''}/routes`)
    .into(app);
  return httpsServer;
}


export { customExpress, customExpressSSL };