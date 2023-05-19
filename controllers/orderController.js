const Order = require("../models/orderModal")

const createOrder=async(req,res,next)=>{
    const user=req.user
    const {fullName,city,houseNo,area,mobile}=req.body

    try {
        if(!user){
            next({status:400,message:"please login first"})
        }
        const order=await Order.create({
            fullName,
            city,
            houseNo,
            area,
            mobile
        })
       res.status(200).json({
        sucess:true,
        order
       })
        
        
    } catch (error) {
        next({message:error.message}) 
    }

}






module.exports={
    createOrder,
}