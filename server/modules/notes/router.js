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

router.post("/upload", verifyJwt, verifyTeacher, upload.single("file"), controller.uploadNotes)
router.get("/by/class/:classCode", verifyJwt, controller.getClassNotes)
router.get("/by/teacher/:teacherId", verifyJwt, controller.getTeacherNotes)
router.get("/download/:notesId", verifyJwt, controller.downloadNotes)


module.exports = router;