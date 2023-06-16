const Product = require("../models/productModel")
const User = require("../models/userModel")




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
// dev 


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
        // filtering
   const queryObj={...req.query}
   const excludeFields=['page','sort','limit',"fields"]
   excludeFields.forEach((el)=>delete queryObj[el]);

    let queryStr=JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    let query=Product.find(JSON.parse(queryStr))
    // shorting
    if(req.query.sort){
        console.log(req.query);
        const sortBy=req.query.sort.split(',').join(' ')
        query= Product.find(JSON.parse(queryStr)).sort(sortBy)
      }else{
        query=query.sort("-createdAt")
        
      }
    //   limiting the fields
    if(req.query.fields){
        const fields=req.query.fields.split(',').join(' ')
        query= Product.find(JSON.parse(queryStr)).select(fields)
    }else{
        query=query.select("-__v")

    }

    // pagination 
    console.log(req.query);
    const page=Number(req.query.page )
    const limit=Number(req.query.limit)
    const skip=(page-1)*limit
    if(req.query.page){
        const productCount=await Product.countDocuments()
        if(skip>=productCount){
            next({status:400,message:"this page doesot exist"})
        }
    }

    query=query.skip(skip).limit(limit)
        let product=await query

        res.status(200).json({
            sucess:true,
            productlength:product.length,
            product 
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


// rate the product
const rateProduct=async(req,res,next)=>{
    const {comment,star}=req.body
    try {
        const product=await Product.findById(req.params.id)
        product.rate.push({
            comment:comment,
            star,
            owner:req.user._id
        })
        await product.save()
        res.send(product)
        console.log("wow")

    } catch (error) {
        next({message:error.message})
        
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
    rateProduct
}