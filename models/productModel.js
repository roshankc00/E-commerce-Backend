const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    rattings:[{
        star:Number,
        Comment:String,
        
    }],    
},{timestamps:true})

const Product=mongoose.model('Product',productSchema)

module.exports=Product