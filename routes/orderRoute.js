const express=require('express')
const { createOrder, deleteOrder } = require('../controllers/orderController')
const { checkAuth } = require('../middlewares/auth')
const router=express.Router()

router.post('/order/create',checkAuth,createOrder)
router.delete('/order/:id',checkAuth,deleteOrder)

module.exports=router 