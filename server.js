const path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      port = process.env.PORT || 3000,
      routes = require('./routes/api');

require('dotenv').config();

//Set up an application
const app = express();

//Connect to mongodb
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-wgddl.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(data => console.log(`MongoDB: connected successfully`))
    .catch(err => {
        console.log(`MongoDB: fail`);
        console.error( err );
    });

//Static directory
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyParser.json());

//API routs: initialize routes middleware
app.use('/jwt', routes);

//Homepage
app.get('/', function(req, res){
    res.send('Root page');
});

//Set up server
app.listen(port, () => {
    console.log(`NODE_ENV value: ${process.env.NODE_ENV}`);
    console.log(`Now listening for requests on localhost:${port}`);
});

