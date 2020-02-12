var express = require('express');
var cors = require('cors');
const greet = require('./greet.js');

class GreetingService {
  constructor(greeting = 'Helo') {
  this.greeting = greeting;
  }
  createGreeting(name) {
      return `${this.greeting}, ${name}!`;
  }
}


// Creates an express app 
const app = express();

// allow Cross Origin requests, for testing
app.use(cors());

// get ip infos even if passing through a proxy like here
app.enable('trust proxy'); 

app.route(`${process.env.PUBLIC_URL}/`)
    .get(function (request, response){
    response.send('Hello world')
});

app.route(`${process.env.PUBLIC_URL}/ip`)
  .get(function(req, res){
    res.setHeader("x-Hello-World", "YG");

    res.json({ipaddress: req.ip});
  });

app.use(`${process.env.PUBLIC_URL}/name`, greet({
    service: new GreetingService('Hello'),
}))
// 404 Not Found Middleware
app.use(function(req, res, next) {

  res.status(404)
    .type('text')
    .send('Not Found');
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
