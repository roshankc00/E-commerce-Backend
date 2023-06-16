const express=require('express')
const { createproduct ,getSingleProduct,updateProduct,deleteProduct,getAllProduct,rateProduct} = require('../controllers/productController')
const { checkAuth } = require('../middlewares/auth')
const upload = require('../middlewares/multer')
const router=express.Router()


router.post('/product/admin/new',upload.single("thumbnail"),createproduct)
router.get('/product/:id',getSingleProduct)
router.put('/product/admin/:id',updateProduct)
router.delete('/product/admin/:id',deleteProduct)
router.get('/products',getAllProduct)
router.post('/product/rate/:id',checkAuth,rateProduct)
module.exports=router
