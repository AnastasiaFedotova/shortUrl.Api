import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routerV1api from './routers/v1/v1api';
import authorizeApi from './routers/authorizeRouter/authorizeApi';
import shortLinksRouter from './routers/shortLinksRouter/router';
import './db/dbShema';
import Cookies from "cookies-ts";

const cookies = new Cookies();
cookies.config({
  expires: "3d",
  path: "/",
})
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
app.use('/api/v1', routerV1api);
app.use('/api/authorize', authorizeApi);
app.use('/', shortLinksRouter);
app.listen(port);
console.log("server started on port");
