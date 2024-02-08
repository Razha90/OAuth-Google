const express = require('express')
const router = express.Router()
const path = require('path')
const authController = require('../controller/googleController')

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'..' ,'view', 'index.html'))
})

router.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'..' ,'view', 'login.html'))
})

router.get('/login/google', authController.login);

router.get('/login/google/callback', authController.googleLogin);

module.exports = router;