const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontroller')
const userauth = require('../middlewares/userauth')
// User route
router.get('/',user.homepage)
router.get('/getlogin',userauth.islogout,user.getlogin)
router.post('/login',user.login)
router.get('/getsignup',userauth.islogout,user.getsignup)
router.post('/signup',user.signup)
router.get('/logout',userauth.islogin,user.logout)
module.exports = router;
