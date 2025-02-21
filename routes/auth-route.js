const express = require('express');
const {registerUser,loginUser,shopRegisterUser,shopUserLogin}=require('../controllers/auth-controllers');
const router = express.Router();

// all are the route are related to authentication & authorization

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/shopRegister',shopRegisterUser);
router.post('/shopLogin',shopUserLogin)

module.exports = router;