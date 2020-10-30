const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Photos = require("../models/photos");
var inspect = require('util').inspect
var Busboy = require('busboy');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage: storage})

// router.post('/:id', (req, res) => {
//     console.log(req.body.image, req.body.raw);
//     Photos.findById(req.params.id, function (err, user) {
//         req.body.image.save()
//         res.send("Received")
//     })

// })



router.post("/:id", (req, res, next) => {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + inspect(file) + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function (data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function () {
            console.log('File [' + fieldname + '] Finished');
        });
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function () {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
    });
    req.pipe(busboy);
    // const photo = new Photos({
    //     _id: new mongoose.Types.ObjectId(),
    //     author_id: req.params.id,
    //     author: req.body.author,
    //     title: req.body.title,
    //     price: "5$",
    //     date: { type: Date, default: Date.now },
    //     image: req.file.path,
    //     sold: false
    // });
    // photo
    //     .save()
    //     .then(result => {
    //         console.log(result);
    //         res.status(201).json({
    //             message: "Created product successfully",
    //             createdProduct: {
    //                 name: result.title,
    //                 price: result.price,
    //                 _id: result._id,
    //                 author: result.author,
    //                 request: {
    //                     type: 'GET',
    //                     url: "http://localhost:3000/upload-image/" + result._id
    //                 }
    //             }
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
});

module.exports = router;