const express=require('express')
const {createAdmin,loginAdmin,sendEmail}=require('../controllers/admin')

const router=express.Router()

router.route('/create-admin').post(createAdmin)
router.route('/login-admin').post(loginAdmin)
router.route('/send-email').post(sendEmail)

module.exports=router