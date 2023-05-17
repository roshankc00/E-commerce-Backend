function Errorhandler(error,req,res,next){
    res.status(error.status || 500);
    res.json({
        error:true,
        message:error.message || "Internal server error"
    })
}


module.exports=Errorhandler