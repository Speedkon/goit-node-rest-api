const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middlewares/auth')

const controller = require('../controllers/auth');
const update = require('../middlewares/avatars');

router.post('/register', controller.registration);
router.post('/login', controller.login);
router.post('/logout', authMiddleware, controller.logout);
router.get('/current', authMiddleware, controller.current);
router.patch('/avatars', authMiddleware, update.single('avatarURL'), controller.updateAvatar);

module.exports = router;