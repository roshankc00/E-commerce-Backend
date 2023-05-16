const Product = require("../models/productModel")
const User = require("../models/userModel")





//===================== create the product========================
const createproduct=async(req,res)=>{
    const {name,description,price,category,brand}=req.body
    try {
        if(!name || !description ||!price ||!category  ||!brand){
            return res.status(400).json({
                sucess:false,
                message:"all the fields are necessary"

            })
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
        res.status(500).json({
            sucess:false,
            error
        })
        
    }

}


//==================get a single product============================
const getSingleProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            return res.status(400).json({
                sucess:false,
                message:"Product doesnt exist",
            })
        }
        res.status(200).json({
            sucess:true,
            product
        })

        
    } catch (error) {
        
    }
}








// update the product
const updateProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            return res.status(400).json({
                sucess:false,
                message:"User with this id doesnt exist"
            })
        }
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            sucess:true,
            updatedProduct
        })
    } catch (error) {
       return  res.status(500).json({
            sucess:false,
            error
        })
        
    }

}


// delete the Product
const deleteProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            return res.status(200).json({
                sucess:true,
                message:"this product doesnt exist"
            })
        }
        const delProduct=await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            sucess:true,
            delProduct
        })  
        
    } catch (error) {
        return  res.status(500).json({
             sucess:false,
             error
         })
         
     }

}

// get all the products ==> filter pagination 
const getAllProduct=async(req,res)=>{
    try {
        const products=await Product.find({})
        res.status(200).json({
            sucess:true,
            products
        })
    } catch (error) {
        return  res.status(500).json({
             sucess:false,
             error
         })
     }
}


// add to the card 
const addProductToCart=async(req,res)=>{
    const {id}=req.body
    try {
        req.user.cart.map((item)=>{
            if(item.toString()===id){
                return res.status(400).json({
                    sucess:false,
                    message:"this item is already added to cart"
                })
            }
        })
        const user=await User.findByIdAndUpdate(req.user.id,{
            $push:{"cart":req.body.id}
        },{new:true})
        res.json(user)

        
    } catch (error) {
        return  res.status(500).json({
             sucess:false,
             error
         })
         
     }

}

// remove from cart
const removeProductFromCart=async(req,res)=>{
    try {
        console.log(req.body.id);
        const removed=await User.findByIdAndUpdate(req.user.id,{
            $pull:{"cart":req.body.id}
        },{new:true})
        res.status(200).json({
            sucess:true,
            removed
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
    removeProductFromCart
}