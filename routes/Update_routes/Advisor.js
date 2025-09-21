const express = require('express')
const { update_advisor } = require('../../controller/Update_controllers/Update_advisor')
const router = express.Router()
router.route('/update_advisor').put(update_advisor)

module.exports = router


