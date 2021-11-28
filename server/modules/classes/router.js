/**
 * assignment-Backend
 * created By - aparsh
 * November 2021
 */
const express = require('express');
const bodyparser = require('body-parser')
const { verifyJwt, verifyTeacher } = require("../../global/jwt");
const controller = require('./controller/controller');
const router = express.Router();
router.use(bodyparser.json());


router.get("/my", verifyJwt, controller.getMyClasses)
router.post("/create", verifyJwt, verifyTeacher,  controller.createClass)
router.get("/all", verifyJwt, controller.getAllClasses)
router.get("/join/:classCode", verifyJwt, controller.joinClass)

module.exports = router;