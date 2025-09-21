const express = require('express')
const { Display_Schedule } = require('../../controller/Display_controllers/Display_shedule')
const router = express.Router()
const authmiddleware=require("../../controller/auth/middleware")



router.route('/display_schedule').get(authmiddleware,Display_Schedule)



module.exports = router