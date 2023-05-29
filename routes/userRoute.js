const express=require('express')
const { registerUser, loginUser,getSingleuser,getAllUser,logoutUser,changeStatus,blockUser,unblockUser, updateUser, forgetPassword, resetPassword} = require('../controllers/userController')
const { checkAuth,isAdmin } = require('../middlewares/auth')
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',checkAuth,logoutUser)
router.post('/updateuser',checkAuth,updateUser)
router.get('/admin/:id',checkAuth,isAdmin,getSingleuser)
router.get('/admin',checkAuth,isAdmin,getAllUser)
router.post('/admin/changestatus',checkAuth,changeStatus)
router.post('/admin/blockuser',checkAuth,isAdmin,blockUser)
router.post('/admin/unblockuser',checkAuth,isAdmin,unblockUser)
router.put('/forgetpassword',forgetPassword)
router.put('/password/reset/:token',resetPassword)


module.exports=router 