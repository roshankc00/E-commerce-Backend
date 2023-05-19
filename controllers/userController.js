const User = require("../models/userModel")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


// ============Register the User===========
const registerUser=async(req,res,next)=>{
    const {name,email,password}=req.body
    try {
        if(!name || !email || !password){
            next({status:400,message:"all the fields are necessary"})
        }
        // hashing the password
        const secpass=await bcrypt.hash(password,10)
       const user= await User.create({
            name,
            email,
            password:secpass
        })
        res.status(200).json({
            sucess:true,
            user

        })
        
    } catch (error) {
       next({message:error.message})
        
    }
}











//========== Login the User================
const loginUser=async(req,res,next)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            next({status:400,message:"login  with proper credentials"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            next({status:400,message:"login  with proper credentials"})
        }
      const token=  jwt.sign({id:user._id},process.env.SECRET)
        res.cookie('token',token,{
            expires:new Date(Date.now()+24*60*60*1000)
        })
        res.status(200).json({
            sucess:true,
            message:"user login sucessfully"
        })
    } catch (error) {
        next({message:error.message})
         
     }

}






// ==========get the user=========
const getSingleuser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user){
            next({status:404,message:'no user exists with this id'})
        }
        res.status(200).json({
            sucess:true,
            user
        })
    } catch (error) {
        next({message:error.message})
         
        
    }

}




// ===============getalltheusers=========adminonly
const getAllUser=async(req,res,next)=>{
    try {
        const users=await User.find({})
        res.status(200).json({
            sucess:true,
            users
        })
        
    } catch (error) {
        next({message:error.message})
         
     }
}







// ============delete the user============
const deleteUser=async(req,res,next)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            next({status:400,message:"no user exist with this id"})
        }
        res.status(200).json({
            sucess:true,
            message:"user has been deleted sucessfully"
        })
        
    } catch (error) {
        next({message:error.message})
         
     }
}



// ================logOut user========
const logoutUser=async(req,res,next)=>{
    try {
        res.cookie('token',null,{
            expires:new Date(Date.now())
        })
        res.status(200).json({
            sucess:true,
            message:"Loged out"
        })       
        
    } catch (error) {
        next({message:error.message})
         
     }
}





// change the userStatus
const changeStatus=async(req,res,next)=>{
    const {id,status}=req.body


    try {
        const updateStatus=await User.findByIdAndUpdate(id,{
            role:status
        },{new:true})
        res.status(200).json({
            sucess:false,
            updateStatus
        })
        
    } catch (error) {
        next({message:error.message})
         
     }
}






// Block the user 
const blockUser=async(req,res,next)=>{
    const id=req.body.id
    console.log(id);
    try {
        const blockedUser=await User.findByIdAndUpdate(id,{
            isBlocked:true
        },{new:true})

        res.status(200).json({
            sucess:true,
            blockedUser
        })
    } catch (error) {
        next({message:error.message})
         
     }
}
const unblockUser=async(req,res,next)=>{
    const id=req.body.id
    try {
        const  unblockedUser=await User.findByIdAndUpdate(id,{
            isBlocked:false
        },{new:true})

        res.status(200).json({
            sucess:false,
            unblockedUser
        })
    } catch (error) {
        next({message:error.message})
         
     }
}



// update the user 
const updateUser=async(req,res,next)=>{
    const {email,oldPassword,newPassword,conformPassword}=req.body
    try {
        if(email!==req.user.email){
            next({status:400,message:"this is not your email"})
        }
        if(newPassword!==conformPassword){
            next({status:400,message:"password and conform password doesnt match"})
        }
        const isPasswordCorrect=await bcrypt.compare(oldPassword,req.user.password)
        if(!isPasswordCorrect){
            next({status:400,message:"incorrect password"})

        }
        const secpass=await bcrypt.hash(newPassword,10)
        console.log(secpass);
        const updatedUser= await User.findOneAndUpdate({email},{
            password:secpass
            
        },{new:true})
        res.status(200).json({
            sucess:true,
            updatedUser
        })
    } catch (error) {
        next({message:error.message})
         
     }
}




// forgetPassword
// const forgetPassword=async(req,res)=>{
//     const {email}=req.body
//     try {
//         const user=await User.findOne({email})
//         if(!user){
//             return res.status(400).json({
//                 sucess:false,
//                 message:"no user with this email exists"
//             })
//         }
        
//     } catch (error) {
        
//     }
// }

//============================================ resetpassword====================


module.exports={
    registerUser,
    loginUser,
    getSingleuser,
    getAllUser,
    logoutUser,
    changeStatus,
    unblockUser,
    blockUser,
    updateUser,
}