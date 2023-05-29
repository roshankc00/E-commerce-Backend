const Order = require("../models/orderModal")
const Product = require("../models/productModel")
const User = require("../models/userModel")

const createOrder=async(req,res,next)=>{
    const user=req.user
    const {fullName,city,houseNo,area,mobile}=req.body
    try {
        let oo=await User.findById(req.user._id).populate('cart')
        // console.log(oo)
        const user=req.user
          if(!user){
        next({status:400,message:"please login first"})
    }
        let amount=0;
        let items=[]
    
        
         const length=oo.cart.length
            oo.cart.map(async(el,index)=>{
                // items.push(el._id)
                items.push(el._id)
                 amount+=el.price
                if(length===index+1){
                    console.log(amount)
                    console.log(items)
                    const order=await Order.create({
                        user:req.user._id,
                        fullName,
                        mobile,
                        city,
                        area,
                        houseNo,
                        products:items,
                        totalAmount:Number(amount)
            
                    })
                    console.log(order)
                   res.status(200).json({
                    sucess:true,
                    order
                   })
                    
                }
            })

         
             
    } catch (error) {
        next({message:error.message}) 
    }

}

const deleteOrder=async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id)
        if(!req.user._id.toString()!==order.user.toString()){
            next({status:400,message:"please delete only your orders"})
        }
        let deleteme=await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"sucessfully deleted the user",
            sucess:true
        })
    } catch (error) {
        next({message:error.message})
        
    }
}


module.exports={
    createOrder,
    deleteOrder
}