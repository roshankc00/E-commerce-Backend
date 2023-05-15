const jwt=require('jsonwebtoken')
const User = require('../models/userModel')

const checkAuth=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.status(400).json({
            sucess:false,
            message:"login with proper credentials"
        })
    } 
    const decordeddata=jwt.verify(token,process.env.SECRET)
    const user=await User.findById(decordeddata.id)
    req.user=user
    
    next()

}

const isAdmin=async(req,res,next)=>{
    if(req.user.role!=="admin"){
        return res.status(400).json({
            sucess:false,
            message:"You are not admin"
        })
    }
    next()

}

module.exports={
    checkAuth,
    isAdmin
}