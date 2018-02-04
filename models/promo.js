const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// require('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency;

// var AccessSchema = new Schema({

//     name:
//         {type:String
//         }
        
// },{
//     timestamps:true
// });

var promoSchema = new Schema({
    buildingname : {
        type: String,
        required: true,
        
    },
    room : {
        type: String,
        required: true,
       
    },
    deviceid: {
        type:String,
        required:true

    },

    devicecategory:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    accessright:[{
        type:String,
        required:true
    }]

    } ,
    {
    timestamps: true
});

var Promos = mongoose.model('promo',promoSchema);

module.exports = Promos;

