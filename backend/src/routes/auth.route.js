const express = require('express')
const passport = require("passport")

const auth = require('../middlewares/auth')
const { authController } = require('../controllers')

const router = express.Router()

router.post("/login", authController.loginGoogle)
router.post("/logout", authController.logout)
router.post('/refresh-tokens', authController.refreshTokens);

// router.get("/google/callback", passport.authenticate("google", { failureRedirect: '/auth/loginfail' }), authController.loginSuccess)
// router.get("/loginfail", authController.loginFail)
module.exports = router