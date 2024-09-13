const catchAsync = require('../utils/catchAsync');
const request = require('request');
const fs = require('fs');
const path = require('path');
const { imagesService } = require('../services');

const upload = catchAsync(async (req, res) => {
  try {
    if (!fs.existsSync('/tmp')) {
      fs.mkdirSync('/tmp');
    }

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

    var obj = {
      name: req.file.originalname,
      desc: req.file.mimetype,
      image: {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/png',
      },
    };
    const result = await imagesService.createImage(obj);

    res.send(
      res.send({
        image: { url: `data:${result.image.contentType};base64, ${Buffer.from(result.image.data).toString('base64')}` },
      })
    );
  } catch (err) {
    res.send(err);
  }
});

module.exports = {
  upload,
};
