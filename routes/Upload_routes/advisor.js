const express = require('express')
const { upload_advisor } = require('../../controller/Upload_controllers/advisor_controller')
const router = express.Router()
router.route('/advisor').post(upload_advisor)

module.exports = router


