const mongoose = require('mongoose');

const ShopUserSchema = new mongoose.Schema({
    username : {
        type :String,
        required  : true,
        trim : true,
    },
    email : {
        type:String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    phone : {
        type : Number,
        require : true,
        unique : true,
        trim : true,
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'shop'
    },
    dob : {
        type  : String,
        require : true,
        trim :  true
    },
    state : {
        type : String,
        trim : true
    },
    city : {
        type : String,
        trim : true
    },
    shopname : {
        type : String,
        required  : true,
        trim : true,
    }
    
},{timestamps : true})

module.exports = mongoose.model('ShopUser',ShopUserSchema);