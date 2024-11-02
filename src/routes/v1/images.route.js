const express = require('express');
const imagesController = require('../../controllers/images.controller');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// const storage = multer.diskStorage({
//   destination: 'tmp',
//   filename: function (req, file, cb) {
//     crypto.randomBytes(20, (err, buf) => {
//       cb(null, buf.toString('hex') + path.extname(file.originalname));
//     });
//   },
// });

const upload = multer({ dest: '/tmp' });

const router = express.Router();
//upload.single('image'),
router.route('/').post(upload.single('image'), imagesController.upload);
router.route('/brochure').post(upload.single('image'), imagesController.upsertBrochure).get(imagesController.getBrochure);
router.route('/banners').post(upload.single('image'), imagesController.addBanner).get(imagesController.getBanners);
router.route('/banners/:id').delete(imagesController.deleteBanner);

module.exports = router;
