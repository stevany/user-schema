var express = require('express');
var app = express();//create the Express app
var bodyParser=require('body-parser');
var cors = require('cors');//to allow access origin
var user = require('./routes/user');
var path = require('path')
var mongoose = require('mongoose');

var MongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/user'

mongoose.Promise = global.Promise;
mongoose.connect(MongoURI);

mongoose.connection.once('open', function() {
    console.log('connection established!');
});

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', user);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res) => {

    res.redirect('/');
  });


app.listen(3010);
console.log("Listening to port 3010");
