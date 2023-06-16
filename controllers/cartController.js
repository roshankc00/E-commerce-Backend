const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

const addProductToCart=async(req,res,next)=>{
    try {
        
  
    const {productId,numberOfProduct}=req.body
    const product=await Product.findById(productId)
    if(!product){
        next({status:404,message:"product not found"})
    }
    const cart=await Cart.findOne({user:req.user._id})
    if(!cart){
       let newcart= await Cart.create({
        user:req.user._id,
       })
       newcart.products.push({
        noOfItem:numberOfProduct,
         item:productId
            })
            await newcart.save()
       res.status(200).json({
        sucess:true,
        newcart
       })
    }else{
        let present=false;
        cart.products.map((el)=>{
            if(el.item.toString()===productId.toString())
            present=true
        })
        
        if(present){
            console.log("this")
            return res.status(200).json({
                sucess:false,
                message:"product is already there in the cart"
            })
        }else{
            cart.products.push({
                noOfItem:numberOfProduct,
                 item:productId
                    })
            await cart.save()
            res.status(200).json({
                sucess:true,
                cart
            })
        }
    }
} catch (error) {
    next({message:error.message})
        
}
}







// delete product from cart
const deleteProductFromCart=async(req,res,next)=>{
    try {
        const {productId}=req.body
        const product=await Product.findById(productId)
        let present=false
        if(!product){
            next({status:404,message:"product not found"})
        }
        const cart=await Cart.findOne({user:req.user._id})
        cart.products.map(async(el,ind)=>{
            if(el.item.toString()===productId.toString()){

                cart.products.splice(ind,1)
                present=true
                await cart.save()
            return res.status(200).json({
                sucess:true,
                message:"product has been deleted sucessfully",
                cart
            })
        }
        })
        if(!present){
            return  res.status(400).json({
                sucess:false,
                messgae:"there is no product with this id",
                cart
            })
        }
    } catch(error) {
        next({message:error.message})
        
    }

}




module.exports={
    addProductToCart,
    deleteProductFromCart
}



