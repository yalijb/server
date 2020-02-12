var express = require('express');
var cors = require('cors');

// Creates an express app 
const app = express();

// allow Cross Origin requests, for testing
app.use(cors());

// get ip infos even if passing through a proxy like here
app.enable('trust proxy'); 

app.route('/')
    .get(function (request, response){
    response.send('Hello world')
});

app.route('/api')
  .get(function(req, res){
    res.json({ipaddress: req.ip, language: req.headers['accept-language'], software: req.headers['user-agent']});
  });

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
