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
const multer = require("multer");
const upload = multer();

router.post("/submit/:assignmentId", verifyJwt, upload.single("file"), controller.submitSolution)
router.get("/all/:assignmentId", verifyJwt, controller.downloadSubmission)
router.get("/download/:submissionId", verifyJwt, controller.downloadSubmission)
router.put("/grade/:submissionId", verifyJwt, verifyTeacher, controller.gradeSubmission)

module.exports = router;