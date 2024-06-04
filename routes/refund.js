const express=require('express')
const {createRefund,getAllRefunds,getSingleRefund,updateRefund,deleteRefund}=require('../controllers/refund')
const auth=require('../middleware/auth')
const router=express.Router()

router.route('/create-refund').post(auth,createRefund)
router.route('/get-refund').get(auth,getAllRefunds)
router.route('/get-refund/:refundNumber').get(auth,getSingleRefund)
router.route('/update-refund/:refundNumber').put(auth,updateRefund)
router.route('/delete-refund/:refundNumber').delete(auth,deleteRefund)




module.exports=router