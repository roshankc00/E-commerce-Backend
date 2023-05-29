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

userSchema.methods.matchPassword = async function (password) {
    const wow = await bcrypt.compare(password, this.password);
    return wow;
  };
  userSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken,"forget")
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    console.log(this.resetPasswordToken)
    console.log(resetToken,"kmdkcmdkm")
    return resetToken;
  };












const User=mongoose.model('User',userSchema)
module.exports=User