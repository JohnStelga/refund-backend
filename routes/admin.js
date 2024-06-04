const express=require('express')
const {createAdmin,loginAdmin}=require('../controllers/admin')

const router=express.Router()

router.route('/create-admin').post(createAdmin)
router.route('/login-admin').post(loginAdmin)

module.exports=router