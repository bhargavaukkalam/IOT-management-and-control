var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

mongoose.Promise = require('bluebird');
const Dishes = require('./models/dishes');
const Promos = require('./models/promo');


var index = require('./routes/index');
var main = require('./routes/main');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');

var promoRouter = require('./routes/promoRouter');



const url = 'mongodb://localhost:27017/iot';

const connect = mongoose.connect(url,{

  useMongoClient:true
      
});

connect.then((db)=>{
  console.log("Connected to the server");

},(err)=>{ console.log(err);
});

var app = express();

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));


app.use('/', main);
app.use('/users', users);




app.use('/endusers', dishRouter);
app.use('/devices', promoRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/devices/public',express.static(path.join(__dirname, 'public')));
app.use('/endusers/public',express.static(path.join(__dirname, 'public')));
app.use('/users/public',express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




// app.use('/dishes', dishRouter);
// app.use('/promotions', promoRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
