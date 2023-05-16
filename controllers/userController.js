const User = require("../models/userModel")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


// ============Register the User===========
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body
    try {
        if(!name || !email || !password){
            res.status(400).json({
                sucess:false,
                message:"all the fields are necessary"
            })
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
        res.status(500).json({
            sucess:false,
            error
        })
        
    }
}











//========== Login the User================
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"login  with proper credentials"
            })
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                sucess:false,
                message:"login with proper credentials"
            })
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
        res.status(500).json({
            sucess:false,
            error
        })
        
    }

}






// ==========get the user=========
const getSingleuser=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user){
           return  res.status(404).json({
                sucess:false,
                message:'no user exists with this id'
            })

        }
        res.status(200).json({
            sucess:true,
            user
        })

        
    } catch (error) {
        res.status(500).json({
            sucess:false,
            error
        })
        
    }

}




// ===============getalltheusers=========adminonly
const getAllUser=async(req,res)=>{
    try {
        const users=await User.find({})
        res.status(200).json({
            sucess:true,
            users
        })
        
    } catch (error) {
        res.status(500).json({
            sucess:false,
            error
        })
        
    }
}







// ============delete the user============
const deleteUser=async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
           return  res.status(404).json({
                sucess:true,
                message:"no user exist with this id"

            })
        }
        res.status(200).json({
            sucess:true,
            message:"user has been deleted sucessfully"
        })
        
    } catch (error) {
        res.status(500).json({
            sucess:false,
            error
        })
        
    }
}



// ================logOut user========
const logoutUser=async(req,res)=>{
    try {
        res.cookie('token',null,{
            expires:new Date(Date.now())
        })
        res.status(200).json({
            sucess:true,
            message:"Logedout"
        })       
        
    } catch (error) {
        res.status(500).json({
            sucess:false,
            error
        })
        
    }
}





// change the userStatus
const changeStatus=async(req,res)=>{
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
        res.status(500).json({
            sucess:false,
            error
        })
        
    }
}






// Block the user 
const blockUser=async(req,res)=>{
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
        res.status(500).json({
            sucess:false,
            error
        })
        
    }
}
const unblockUser=async(req,res)=>{
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
        res.status(500).json({
            sucess:false,
            error
        })
        
    }
}



// update the user 
const updateUser=async(req,res)=>{
    const {email,oldPassword,newPassword,conformPassword}=req.body
    try {
        if(email!==req.user.email){
            return res.status(400).json({
                sucess:false,
                message:"this is not your email"
            })
        }
        if(newPassword!==conformPassword){
            return res.status(400).json({
                sucess:false,
                message:"Password and confirm password  doesnt match"
            })
        }
        const isPasswordCorrect=await bcrypt.compare(oldPassword,req.user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                sucess:false,
                message:"Password is not correct"
            })

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
        res.status(500).json({
            sucess:false,
            error
        })
        
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