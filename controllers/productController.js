const Errorhandler = require("../middlewares/errorHandler")
const Product = require("../models/productModel")
const User = require("../models/userModel")

Errorhandler



//create the product
const createproduct=async(req,res,next)=>{
    const {name,description,price,category,brand}=req.body

    try {
        if(!name || !description ||!price ||!category  ||!brand){
           next({status:400,message:"All the fields are necessary"})
        }
        const product=await Product.create({
            name,
            description,
            price,
            category,
            brand
        })
        
        res.status(200).json({
            sucess:true,
            product
        })
        
    } catch (error) {
        next({message:error.message})
    }

}


//get a single product
const getSingleProduct=async(req,res,next)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            next({status:400,message:"product doesnt exist"})
        }
        res.status(200).json({
            sucess:true,
            product
        })

        
    } catch (error) {
        next({message:error.message})
    }
}








// update the product
const updateProduct=async(req,res,next)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            next({status:400,message:"product doesnt exist"})
       
        }
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            sucess:true,
            updatedProduct
        })
    } catch (error) {
        next({message:error.message})
    }

}


// delete the Product
const deleteProduct=async(req,res,next)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            next({status:400,message:"product doesnt exist"})
        }
        const delProduct=await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            sucess:true,
            delProduct
        })  
        
    } catch (error) {
        next({message:error.message})
    }

}

// get all the products ==> filter pagination 
const getAllProduct=async(req,res,next)=>{
    try {
        const products=await Product.find({})
        res.status(200).json({
            sucess:true,
            products
        })
    } catch (error) {
        next({message:error.message})
    }
}


// add to the card 
const addProductToCart=async(req,res,next)=>{
    const {id}=req.body
    try {     
        const product=await Product.findById(id)
        if(!product){
            next({status:400,message:"this product is not available"})
            
        }   
        req.user.cart.map((item)=>{
            if(item.toString()===id){
                next({status:400,message:"this item is already added to cart"})
            }
        })
        const user=await User.findByIdAndUpdate(req.user.id,{
            $push:{"cart":req.body.id}
        },{new:true})
        res.json(user)

        
    } catch (error) {
        next({message:error.message})
    }

}

// remove from cart
const removeProductFromCart=async(req,res,next)=>{
    try {
        const product=await Product.findById(req.body.id)
        if(!product){
            next({status:400,message:"this product is not available"})
            
        }  
        console.log(req.body.id);
        const removed=await User.findByIdAndUpdate(req.user.id,{
            $pull:{"cart":req.body.id}
        },{new:true})
        res.status(200).json({
            sucess:true,
            removed
        })
    } catch (error) {
        next({message:error.message})
    }
}



// ratings 
const addRating=async(req,res)=>{
    const postedBy=req.user.id
    const {star,productId,comment}=req.body
    let alreadyrated=false
    try {
        const product=await Product.findById(productId)
        product.rattings.map((pro)=>{
            if(pro._id.toString()===id.toString()){
                alreadyrated
            }
        })
        if(alreadyrated){
            return res.send(alreadyrated)
        }
   const rateproduct=await Product.findByIdAndUpdate(productId,{
    $push:{
        rattings:{
            star:star,
            comment:comment,
            postedBy
        }
    }
   },{new:true})
   
   res.status(200).json({
    rateproduct
   })
        
        
    } catch (error) {
        return  res.status(500).json({
             sucess:false,
             error
         })
         
     }
}






module.exports={
    createproduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    addProductToCart,
    removeProductFromCart,
    addRating
}