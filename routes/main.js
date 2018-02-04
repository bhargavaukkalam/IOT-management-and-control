var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // function auth(req,res,next){
  console.log(req.session);

  if(!req.session.user){
        var err = new Error('You are not authenticated!');
        // err.status = 403;
        console.log("You are not authenticated");
        return res.redirect('/users/login');
      }
    
  else{
    if(req.session.user=== 'authenticated'){
      res.render('index');
    }
    else{
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);

    }
  // }
  
}


// app.use(auth);
//   res.render('index');
});

module.exports = router;
