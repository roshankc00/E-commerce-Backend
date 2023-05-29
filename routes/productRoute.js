const express=require('express')
const { createproduct ,getSingleProduct,updateProduct,deleteProduct,getAllProduct,addProductToCart,removeProductFromCart, rateProduct} = require('../controllers/productController')
const { checkAuth } = require('../middlewares/auth')
const router=express.Router()

router.post('/product/addtocart',checkAuth,addProductToCart)
router.post('/product/removefromcart',checkAuth,removeProductFromCart)
router.post('/product/admin/new',createproduct)
router.get('/product/:id',getSingleProduct)
router.put('/product/admin/:id',updateProduct)
router.delete('/product/admin/:id',deleteProduct)
router.get('/products',getAllProduct)
router.post('/product/rate/:id',checkAuth,rateProduct)
module.exports=router



