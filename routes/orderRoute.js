const express=require('express')
const { checkAuth } = require('../middlewares/auth')
const { createOrder, deleteOrder, getASingleOrder, getAllOrder, orderinfo, orderRecieved } = require('../controllers/orderController')
const router=express.Router()


router.post('/order/create',checkAuth,createOrder)
router.delete('/order/:id',checkAuth,deleteOrder)
router.get('/order/:id',checkAuth,getASingleOrder)
router.get('/orders',checkAuth,getAllOrder)
router.get('/order/recieved/:id',checkAuth,orderRecieved)

module.exports=router 