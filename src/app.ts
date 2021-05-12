const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerV1api = require('./routers/v1/v1api');
const shortLinksRouter = require('./routers/shortLinksRouter/router');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
app.use('/api/v1', routerV1api);
app.use('/', shortLinksRouter);
app.listen(port);
console.log("server started on port");
