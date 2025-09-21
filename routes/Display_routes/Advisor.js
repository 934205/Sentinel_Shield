const express = require('express')
const { Display_Advisor } = require('../../controller/Display_controllers/Display_advisor')
const router = express.Router()


router.route('/display_advisor').get(Display_Advisor)


module.exports = router