const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});