const express = require('express');
const imagesController = require('../../controllers/images.controller');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'tmp',
  filename: function (req, file, cb) {
    crypto.randomBytes(20, (err, buf) => {
      cb(null, buf.toString('hex') + path.extname(file.originalname));
    });
  },
});

const upload = multer({ storage });

const router = express.Router();

router.route('/').post(upload.single('image'), imagesController.upload);

module.exports = router;
