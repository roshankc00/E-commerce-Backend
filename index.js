const express=require('express')
const connectDb = require('./config/connectDb')
const dotenv=require('dotenv').config({path:"./config/.env"})
const cors=require('cors')
const morgan=require('morgan')
const cookieParser = require('cookie-parser')
const Errorhandler = require('./middlewares/errorHandler')
const cloudinary=require('cloudinary')
// rest variables
const app=express()
const PORT=process.env.PORT

// configuring the cloudinary 
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})

// connecting to the Database
connectDb()



// all the routes import 
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')
const orderRoute=require('./routes/orderRoute')
const cartRoute=require('./routes/cartRoute')


// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())




// all the routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1',productRoute)
app.use('/api/v1',orderRoute)
app.use('/api/v1',cartRoute)
app.use(Errorhandler)

app.listen(PORT,()=>{
    console.log(`Listening at the port ${PORT}`);
})

