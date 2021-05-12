import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routerV1api from './routers/v1/v1api';
import shortLinksRouter from './routers/shortLinksRouter/router';
import sequelize from './db/dbShema';

sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
app.use('/api/v1', routerV1api);
app.use('/', shortLinksRouter);
app.listen(port);
console.log("server started on port");
