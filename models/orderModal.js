const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    fullName:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,         
    },
    city:{
        type:String,
        required:true, 
    },
    area:{
        type:String,
        required:true, 
    },
    houseNo:{
        type:Number,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },  
    totalAmount:Number,
    status:{
        type:String,
        default:"unpaid",
        enum:["unpaid","paid"]
    },
    recieved:{
        type:Boolean,
        default:false
    },
    orderInfo:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const Order=mongoose.model('Order',orderSchema)
module.exports=Order 


// total amount garna 

