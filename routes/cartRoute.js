const express=require('express')
const { addProductToCart, deleteProductFromCart } = require('../controllers/cartController')
const { checkAuth } = require('../middlewares/auth')

const router=express.Router()

router.post('/cart/create',checkAuth,addProductToCart)
router.delete('/cart/delete',checkAuth,deleteProductFromCart)


module.exports=router