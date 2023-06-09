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
    thumbnail:{
        url:String,
        public:String
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        imgloc:String,
           imgurl:String
        },
    brand:{
        type:String,
        required:true
    },
    rate:[{
        star:Number,
        comment:String,
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }],    
},{timestamps:true})

const Product=mongoose.model('Product',productSchema)

module.exports=Product


// 