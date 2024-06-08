const express=require('express')
const {createAdmin,loginAdmin,sendEmail,checkToken}=require('../controllers/admin')
const auth=require('../middleware/auth')
const router=express.Router()

router.route('/create-admin').post(createAdmin)
router.route('/login-admin').post(loginAdmin)
router.route('/send-email').post(sendEmail)
router.route('/check-token').get(auth,checkToken)
module.exports=router