const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// require('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency;

// var commentSchema = new Schema({

//     comment:{
//         type:String,
//         required:true
//         },
//     rating:{
//         type:Number,
//         min:1,
//         max:10,
//         required:true

//     },
// },{
//     timestamps:true
// });

var dishSchema = new Schema({
         firstname: {
            type: String,
            required: true,
            
        },
        lastname: {
            type: String,
            required: true,
        
        },
        usercategory: {
            type: String,
            required: true
        },
        emailid:{
            type: String,
            required:true,
                
        },
        sbuid: {
            type:Number,
            required:true
        },
        gender:{
            type: String,
            required:true
        }
        }    , {
        timestamps: true
    });

var Dishes = mongoose.model('dish',dishSchema);

module.exports = Dishes;

