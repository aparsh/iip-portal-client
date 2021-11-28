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


router.post("/upload", verifyJwt, verifyTeacher ,upload.single("file"), controller.uploadAssignment)
router.get("/due", verifyJwt, controller.dueAssignments)
router.get("/due/:classCode", verifyJwt, controller.dueAssignmentsByClass)
router.get("/past", verifyJwt, controller.pastAssignments)
router.get("/past/:classCode", verifyJwt, controller.pastAssignmentsByClass)
router.get("/all/:classCode", verifyJwt, controller.allAssignmentsByClass)
router.get("/download/:assignmentId", verifyJwt, controller.downloadAssinment)

module.exports = router;