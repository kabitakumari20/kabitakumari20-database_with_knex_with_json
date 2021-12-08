const express = require("express");
const app = express();
app.use(express.json());
const data = require('./router/router');
app.use('/', data);

app.listen(4000, () => {
  console.log('We have connected with our this port no 4000');
});