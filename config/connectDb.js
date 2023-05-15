const mongoose=require('mongoose')


const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected to the database");
    }).catch(()=>{
        console.log("falied to connect the database");
    })
}

module.exports=connectDb