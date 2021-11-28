/**
 * assignment-Backend
 * created By - aparsh
 * November 2021
 */
const express = require('express');
const bodyparser = require('body-parser')
const router = express.Router();
router.use(bodyparser.json());
// const { upload, getFileObject } = require("../global/fileUpload");
const {File} = require("../models/File");
var fs = require('fs');
var path = require('path');
const multer = require("multer");

const upload = multer();
router.post("/upload", upload.single("file"), async (req, res, next) => {
    let fileObj = new File({
        name: req.body.name,
        file: {
            buffer: req.file.buffer,
            contentType: req.file.mimetype
        }
    })

    console.log(typeof(req.file),req.file)
    res.send(fileObj);
    // let saved = fileObj.save();
    // res.send(saved);
});

// router.get("/get", verifyJwt, controller.getMyClasses)

module.exports = router;