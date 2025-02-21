const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    username : {
        type : String,
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
    dob : {
        type  : String,
        require : true,
        trim :  true
    },
    role : {
        type : String,
        default : 'user'
    }
},{timestamps : true});


module.exports = mongoose.model('User',UserSchema)