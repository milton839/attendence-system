const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const adminAttendenceRoutes = require('./adminAttendence');
const authenticate = require('../middleware/authenticate');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, userRoutes);
router.use('/api/v1/admin/attendance', authenticate, adminAttendenceRoutes);

module.exports = router;