const catchAsync = require('../utils/catchAsync');
const request = require('request');
const fs = require('fs');
const path = require('path');
const { imagesService } = require('../services');
const { v2 } = require('cloudinary');
const httpStatus = require('http-status');

const freeImageHosting = (req, res) => {
  /** free image hosting */
  // const source = fs.createReadStream(req.file.path);
  // const options = {
  //   method: 'POST',
  //   url: 'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&format=json',
  //   headers: {},
  //   formData: { source },
  // };
  // request(options, function (error, response) {
  //   fs.unlinkSync(req.file.path);
  //   if (error) throw new Error(error);
  //   res.send(JSON.parse(response.body));
  // });
};

const uploadToMongoDb = (req, res) => {
  /** upload to mongodb */
  // var obj = {
  //   name: req.file.originalname,
  //   desc: req.file.mimetype,
  //   image: {
  //     data: fs.readFileSync(req.file.path),
  //     contentType: 'image/png',
  //   },
  // };
  // const result = await imagesService.createImage(obj);
  // res.send({
  //   image: { url: `data:${result.image.contentType};base64, ${Buffer.from(result.image.data).toString('base64')}` },
  // });
};

const cloudinary = async (req, res) => {
  try {
    const cloudinary = v2;
    // Configuration
    cloudinary.config({
      cloud_name: 'dthdnryp3',
      api_key: '616178389367325',
      api_secret: '3ZaTxgGioe7ynwPfM4jP2ijT_PI', // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image

    // const source = fs.createReadStream(req.file.path);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'catalogues',
      public_id: `${req.file.originalname}${req.file.size}${req.file.encoding}`,
      resource_type: 'auto',
    });

    const optimizeUrl = cloudinary.url(uploadResult.secure_url, {
      fetch_format: 'auto',
      quality: 'auto',
    });
    fs.unlinkSync(req.file.path);

    return {
      image: { url: optimizeUrl },
    };
  } catch (err) {
    throw err;
  }
};

const upload = catchAsync(async (req, res) => {
  try {
    if (!fs.existsSync('/tmp')) {
      fs.mkdirSync('/tmp');
    }
    /** cloudinary */
    res.send(await cloudinary(req, res));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(err);
  }
});

const upsertBrochure = catchAsync(async (req, res) => {
  try {
    if (!fs.existsSync('/tmp')) {
      fs.mkdirSync('/tmp');
    }
    const image = {
      data: fs.readFileSync(req.file.path),
      contentType: 'image/png',
    };

    const result = imagesService.upsertBrochure({ image });
    res.send({ message: 'success' });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(err);
  }
});

const getBrochure = catchAsync(async (req, res) => {
  try {
    const result = await imagesService.getBrochure();
    res.send(result?.results?.[0]?.image ?? { data: {} });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(err);
  }
});

module.exports = {
  upload,
  upsertBrochure,
  getBrochure,
};
