import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routerV1api from './routers/v1/v1api';
import authorizeApi from './routers/authorizeRouter/authorizeApi';
import shortLinksRouter from './routers/shortLinksRouter/router';
import session from './middlewares/sessionMiddleware';
import './db/linkShema';
import './db/userShema';
import './db/sessionShema';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser('secret'));

const whitelist = ['http://localhost:4200', 'https://localhost:4200'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(session);
app.use('/api/v1', routerV1api);
app.use('/api/authorize', authorizeApi);
app.use('/', shortLinksRouter);
app.listen(port);
console.log("server started on port");
