const { getEnable, getDisable, getStatus } = require('../controller/adminAttendence');

const router = require('express').Router();

router.get('/enable', getEnable)
router.get('/disable', getDisable)
router.get('/Status', getStatus)

module.exports = router;