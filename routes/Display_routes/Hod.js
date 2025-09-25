const express = require('express')
const { Display_Hod } = require('../../controller/Display_controllers/Display_hod')
const router = express.Router()


router.route('/display_hod').get(Display_Hod)


module.exports = router