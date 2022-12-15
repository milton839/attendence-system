const { getAttendanceStatus, getAttendance } = require('../controller/studentAttendance');

const router = require('express').Router();

router.get('/status', getAttendanceStatus);
router.get('/:id', getAttendance);
module.exports = router;