const express = require('express')
const { update_timing } = require('../../controller/Update_controllers/Update_schedule')
const router = express.Router()
router.route('/update_timing').put(update_timing)

module.exports = router


