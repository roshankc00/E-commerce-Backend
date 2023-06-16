const Cart = require("../models/cartModel")
const Order = require("../models/orderModal")

const createOrder=async(req,res,next)=>{
    try {
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
            next({status:404,message:"no order found"})
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

module.exports={
    createOrder,
    deleteOrder,
    getASingleOrder,
    getAllOrder
}