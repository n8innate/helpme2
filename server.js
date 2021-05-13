const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(200);
});

app.use('*', (req, res) => res.status(400).send('Page Not Found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
