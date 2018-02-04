const express = require('express');
const bodyParser = require('body-parser');
const Promos = require('../models/promo');
var promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.get('/adddevice',(req,res)=>{
    res.render("adddevice");
});

promoRouter.get('/list',(req,res)=>{
    res.render("alldevice");
});
promoRouter.get('/modifydevice',(req,res)=>{
    res.render("modifydevice");
});
promoRouter.get('/removedevice',(req,res)=>{
    res.render("removedevice");
});

promoRouter.route('/')
.get((req,res)=>{
    Promos.find({})
    .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

.post((req,res)=>{
    Promos.create(req.body)
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(promo);
    })
    .catch((err)=>console.log(err))
})

// .put((req,res,next)=>{
    
//     res.statusCode = 403;    
//     res.end('This is not supported');
// })

.put((req,res)=>{
    Promos.findOneAndUpdate({deviceid: req.body.deviceid},{
            $set : req.body
        }, {new:true
        })
        .then((promo)=>{
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(promo);
        },(err)=>next(err))
        .catch((err)=>next(err))
       
}) 

// .delete((req,res,next)=>{
//     Promos.remove({})
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-type','application/json');
//         res.json(resp);
//     },(err)=>next(err))
//     .catch((err)=>next(err))
// });

.delete((req,res)=>{
    Promos.findOneAndRemove({deviceid: req.body.deviceid})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))

});


    
promoRouter.route('/:promoID')  
.get((req,res,next)=>{
    Promos.findById(req.params.promoID)
        .then((promo)=>{
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(promo);
        },(err)=>next(err))
        .catch((err)=>next(err))
        
})
        
.post((req,res,next)=>{
        res.render("alldevice");
})
        
.put((req,res,next)=>{
    Promos.findByIdAndUpdate(req.params.promoID,{
            $set : req.body
        }, {new:true
        })
        .then((promo)=>{
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(promo);
        },(err)=>next(err))
        .catch((err)=>next(err))
       
})    
        
.delete((req,res,next)=>{
    Promos.findByIdAndRemove(req.params.promoID)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
}); 



// dishRouter.route('/:dishID/comments')
// .get((req,res,next)=>{
//     Dishes.findById(req.params.dishID)
//     .then((dish)=>{
//         if(dish!=null){
//             res.statusCode = 200;
//             res.setHeader('Content-type','application/json');
//             res.json(dish.comments);
//         }
//       else
//       {
//         err = new Error('Dish ' + req.params.dishID + 'not found');
//         err.statusCode = 404;
//         return next(err);
//       }
//     },(err)=>next(err))
//     .catch((err)=>next(err))
// })

// .post((req,res,next)=>{
//     Dishes.findById(req.params.dishID)
//     .then((dish)=>{
//         if(dish!=null){

//             dish.comments.push(req.body);
//             dish.save()
//             .then((dish)=>{
//                 res.statusCode = 200;
//                 res.setHeader('Content-type','application/json');
//                 res.json(dish);

//             },(err)=> next(err))
            
//         }
//       else
//       {
//         err = new Error('Dish ' + req.params.dishID + 'not found');
//         err.statusCode = 404;
//         return next(err);
//       }
//     },(err)=>next(err))
//     .catch((err)=>next(err))
// })

// .put((req,res,next)=>{
    
//     res.statusCode = 403;    
//     res.end('This is not supported');
// })


// .delete((req,res,next)=>{
//     Dishes.findById(req.params.dishID)
//     .then((dish) => {
//         if (dish != null) {
//             for (var i = (dish.comments.length -1); i >= 0; i--) {
//                 dish.comments.id(dish.comments[i]._id).remove();
//             }
//             dish.save()
//             .then((dish) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(dish);                
//             }, (err) => next(err));
//         }
//         else {
//             err = new Error('Dish ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));    
// });

    
    
// promoRouter.route('/:dishId/comments/:commentId')
// .get((req,res,next) => {
//     Dishes.findById(req.params.dishId)
//     .then((dish) => {
//         if (dish != null && dish.comments.id(req.params.commentId) != null) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(dish.comments.id(req.params.commentId));
//         }
//         else if (dish == null) {
//             err = new Error('Dish ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//         else {
//             err = new Error('Comment ' + req.params.commentId + ' not found');
//             err.status = 404;
//             return next(err);            
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /dishes/'+ req.params.dishId
//         + '/comments/' + req.params.commentId);
// })
// .put((req, res, next) => {
//     Dishes.findById(req.params.dishId)
//     .then((dish) => {
//         if (dish != null && dish.comments.id(req.params.commentId) != null) {
//             if (req.body.rating) {
//                 dish.comments.id(req.params.commentId).rating = req.body.rating;
//             }
//             if (req.body.comment) {
//                 dish.comments.id(req.params.commentId).comment = req.body.comment;                
//             }
//             dish.save()
//             .then((dish) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(dish);                
//             }, (err) => next(err));
//         }
//         else if (dish == null) {
//             err = new Error('Dish ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//         else {
//             err = new Error('Comment ' + req.params.commentId + ' not found');
//             err.status = 404;
//             return next(err);            
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .delete((req, res, next) => {
//     Dishes.findById(req.params.dishId)
//     .then((dish) => {
//         if (dish != null && dish.comments.id(req.params.commentId) != null) {
//             dish.comments.id(req.params.commentId).remove();
//             dish.save()
//             .then((dish) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(dish);                
//             }, (err) => next(err));
//         }
//         else if (dish == null) {
//             err = new Error('Dish ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//         else {
//             err = new Error('Comment ' + req.params.commentId + ' not found');
//             err.status = 404;
//             return next(err);            
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });


    
module.exports = promoRouter;
