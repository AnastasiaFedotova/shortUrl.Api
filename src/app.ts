import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerV1api from './routers/v1/v1api';
import authorizeApi from './routers/authorizeRouter/authorizeApi';
import commentsApi from './routers/commentsRouter/commentsApi';
import shortLinksRouter from './routers/shortLinksRouter/router';
import session from './middlewares/sessionMiddleware';

import './db/commentShema';
import './db/linkShema';
import './db/userShema';
import './db/sessionShema';
import './db/tagShema';
import './db/linksTagShema';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

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
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(session);
app.use('/api/v1', routerV1api);
app.use('/api/authorize', authorizeApi);
app.use('/api/comments', commentsApi);
app.use('/', shortLinksRouter);
app.listen(port);
console.log("server started on port");
