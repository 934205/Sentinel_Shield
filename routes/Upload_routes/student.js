const express = require('express')
const { upload_student } = require('../../controller/Upload_controllers/student_controller')
const router = express.Router()

const authmiddleware=require("../../controller/auth/middleware")

router.route('/student').post(authmiddleware,upload_student)


module.exports = router

