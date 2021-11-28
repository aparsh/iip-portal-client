/**
 * assignment-Backend
 * created By - aparsh
 * November 2021
 */
 const express = require('express');
 const bodyparser = require('body-parser')
 const { verifyJwt } = require("../../global/jwt");
 const controller = require('./controller/controller');
 const router = express.Router();
 router.use(bodyparser.json());
 const multer = require("multer");
 const upload = multer();
 
 router.get("/details", verifyJwt, controller.getDetails)
 
 module.exports = router;