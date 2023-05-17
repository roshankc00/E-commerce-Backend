const express=require('express')
const connectDb = require('./config/connectDb')
const dotenv=require('dotenv').config({path:"./config/.env"})
const cors=require('cors')
const morgan=require('morgan')
const cookieParser = require('cookie-parser')
const Errorhandler = require('./middlewares/errorHandler')
// rest variables
const app=express()
const PORT=process.env.PORT


// connecting to the Database
connectDb()



// all the routesimport 
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')


// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())




// all the routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1',productRoute)
app.use(Errorhandler)

app.listen(PORT,()=>{
    console.log(`Listening at the port ${PORT}`);
})

