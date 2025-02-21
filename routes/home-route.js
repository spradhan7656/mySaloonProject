const express = require('express');
const getSanloonShops=require('../controllers/home-controllers')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router();

router.get('/get',authMiddleware,getSanloonShops);

module.exports = router