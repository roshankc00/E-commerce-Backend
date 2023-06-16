const mongoose=require('mongoose')
const cartSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        noOfItem:{
           type:Number
        },
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    }]
  
},{timestamps:true})

const Cart=mongoose.model('Cart',cartSchema)
module.exports=Cart