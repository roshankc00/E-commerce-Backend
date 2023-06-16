const mongoose=require('mongoose')
const crypto=require('crypto')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

const User=mongoose.model('User',userSchema)
module.exports=User