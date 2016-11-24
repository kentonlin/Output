'use strict';

const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

app.get('/', function(req, res) {
  console.log('this is the artist');
});
