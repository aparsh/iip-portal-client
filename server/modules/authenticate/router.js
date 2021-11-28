/**
 * assignment-Backend
 * created By - aparsh
 * November 2021
 */
const express = require('express');
const bodyparser = require('body-parser')
const controller = require('./controller/controller');
const router = express.Router();
router.use(bodyparser.json());


router.post("/login", controller.login)
router.post("/register", controller.register)


module.exports = router;