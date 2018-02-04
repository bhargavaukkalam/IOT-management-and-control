var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/', function(req, res, next) {
//   res.render("index");
// });

router.get('/login',(req,res)=>{
  res.render("loginpage");
});


router.post('/signup' , function(req, res, next){
  User.findOne({username:req.body.username})
  .then((user) =>{
    if(user != null){
      var err = new Error('user ' + req.body.username + ' already exists');
      err.status = 403;
      next(err);

    }
    else{
      return User.create({
        username:req.body.username,
        password:req.body.password
      });
    }
    })
  .then((user) => {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration Succesful', user: user});

  }, (err) => next(err))
 .catch((err)=> next(err));

});

router.post('/login', (req, res, next) => {
    // console.log(req.body,req.body.adminemail,req.body.adminpassword);
    // console.log('string file : ', req.body);
    // var body = JSON.parse(req.body);
    // console.log('JSON file is: ');

    // if(body.adminemail =='iotadmin@stonybrook.edu' && body.adminpassword =='admin' ){   

    //consider this:

      console.log('Inside');
      req.session.user = 'authenticated';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain'); 
      res.redirect('/');


    // }
    // else if(req.body.adminpassword !=='admin'){
    //   var err = new Error('You are not authenticated');
    //   err.status = 403;
    //   return next(err);


    // }
    // if(!req.session.user) {
    //   var authHeader = req.headers.authorization;
      
    //   if (!authHeader) {
    //     var err = new Error('You are not authenticated!');
    //     res.setHeader('WWW-Authenticate', 'Basic');
    //     err.status = 401;
    //     return next(err);
    //   }
    
    //   var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    //   var username = auth[0];
    //   var password = auth[1];
    // console.log(req.body);

    //   User.findOne({username: req.body.username})
    //   .then((user) => {
    //     if (user === null) {
    //       console.log("check1");
    //       var err = new Error('User ' + username + ' does not exist!');
    //       err.status = 403;
    //       return res.end('user no!')
    //     }
    //     else if (user.password !== req.body.password) {
    //       console.log("check2");
    //       var err = new Error('Your password is incorrect!');
    //       err.status = 403;
    //       return res.end('Wrong password!')
    //     }
    //     else if (user.username === req.body.username && user.password === req.body.password) {
    //       console.log("check3");
    //       req.session.user = 'authenticated';
    //       res.statusCode = 200;
    //       res.setHeader('Content-Type', 'text/plain');
    //       res.end('logedin');
    //       // res.end('You are authenticated!')
    //     }
    //   })
    //   .catch((err) => next(err));
    // }
    // else {
    //   res.statusCode = 200;
    //   res.setHeader('Content-Type', 'text/plain');
    //   res.end('You are already authenticated!');
    // }
});

router.get('/logout' , function(req,res) {
  console.log("logout");

  if(req.session)
  {
   
    req.session.destroy();
    res.clearCookie('session-id');
    res.setHeader('Content-Type', 'text/plain');
    res.end('logout');
  }
  else{
    var err = new Error('you are not logged in!');
    err.status = 403;
    next(err);
  }

});

module.exports = router;

