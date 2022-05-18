const express = require('express')
const passport = require("passport")

const auth = require('../middlewares/auth')
const { authController } = require('../controllers')

const router = express.Router()

router.get("/login", authController.loginGoogle)
router.get("/google/callback", passport.authenticate("google", { failureRedirect: '/auth/loginfail' }), authController.loginSuccess)
router.get("/loginfail", authController.loginFail)
router.post("/logout", auth('admin', 'owner', 'customer'), authController.logout)
router.post('/refresh-tokens', authController.refreshTokens);


module.exports = router