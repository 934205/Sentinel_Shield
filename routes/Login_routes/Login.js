const express = require('express')
const { Login,VerifyOtp } = require('../../controller/Login/Login')
const router = express.Router()
router.route('/login').get(Login)
router.route('/verify-otp').post(VerifyOtp);


module.exports = router