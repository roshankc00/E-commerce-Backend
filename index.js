const express=require('express')
const dotenv=require('dotenv').config({path:"./config/.env"})
const app=express()
const PORT=process.env.PORT

app.get('/',(req,res)=>{
    res.send("hlo from server ")
})

app.listen(PORT,()=>{
    console.log(`Listening at the port ${PORT}`);
})

