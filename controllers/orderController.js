const Cart = require("../models/cartModel")
const Order = require("../models/orderModal")

const createOrder=async(req,res,next)=>{
    try {
        let order=await Order.findOne({user:req.user._id})
        if(order){
            next({status:400,message:"there is already your order pending"})
        }
        const {fullName,mobile,city,area,houseNo}=req.body
        if(!fullName || !mobile || !city || !area || !houseNo){
            next({status:404,message:"all the field is required"})
        }
        const cart=await Cart.findOne({user:req.user._id}).populate({
            path:'products',
            populate:{
                path:'item',
                model:"Product"
            }
        })
        let totalAmount=0;
        cart.products.map((el)=>{
            totalAmount+=el.item.price
        })
       
        const newOrder=await Order.create({
            fullName,
            mobile,
            area,
            houseNo,
            city,
            cart:cart._id,
            user:req.user._id,
            totalAmount
        })

        res.status(200).json({
            sucess:true,
            message:"order recieved",
            newOrder
        })
        
    } catch (error) {
        next({message:error.message})
        
    }
}


const deleteOrder=async(req,res,next)=>{
    try {
        const orderId=req.params.id
        const order=await Order.findById(req.params.id)
        if(!order){
            next({status:404,message:"no order found or already delivered"})
        }
        if(order.user.toString!==req.user.id.toString()){
            next({status:404,message:"this is not your order"})
        }
        const delOrder=await Order.findByIdAndDelete(orderId)
        res.status(200).json({
            sucess:true,
            message:"order deleted sucessfully",
        })
        
    } catch (error) {
        next({message:error.message})
        
    }
}


const getASingleOrder=async(req,res,next)=>{
    try {
        const order=await Order.findById(req.params.id)
        if(!order){
            next({status:404,message:"there is no such order"})
        }
        if(order.user.toString!==req.user.id.toString()){
            next({status:404,message:"this is not your order"})
        }
     
        res.status(200).json({
            sucess:true,
            order
        })
        
    } catch (error) {
        
        next({message:error.message})
    }
}

const getAllOrder=async(req,res,next)=>{
    try {
        const orders=await Order.find({})
        res.status(200).json({
            sucess:true,
            orders
        })
    } catch (error) {
        
        next({message:error.message})
    }
}




const orderRecieved=async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order){
        next({status:404,message:"there is no such order"})
    }
    else{
        const orderdel=await Order.findOneAndDelete({user:req.user._id})
        res.status(200).json({
            sucess:true,
            message:"order done and order is deleted from the list "
        })
    }
}


module.exports={
    createOrder,
    deleteOrder,
    getASingleOrder,
    getAllOrder,
    orderRecieved,
}