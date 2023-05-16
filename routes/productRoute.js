const express=require('express')
const { createproduct ,getSingleProduct,updateProduct,deleteProduct,getAllProduct} = require('../controllers/productController')
const router=express.Router()

router.post('/product/admin/new',createproduct)
router.get('/product/:id',getSingleProduct)
router.put('/product/admin/:id',updateProduct)
router.delete('/product/admin/:id',deleteProduct)
router.get('/products',getAllProduct)





module.exports=router



