const catchAsync = require('../utils/catchAsync');
const request = require('request');
const fs = require('fs');

const upload = catchAsync(async (req, res) => {
  if (!fs.existsSync('/uploads')) {
    fs.mkdirSync('/uploads');
  }

  const source = fs.createReadStream(req.file.path);

  const options = {
    method: 'POST',
    url: 'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&format=json',
    headers: {},
    formData: { source },
  };

  request(options, function (error, response) {
    fs.unlinkSync(req.file.path);
    if (error) throw new Error(error);
    res.send(JSON.parse(response.body));
  });
});

module.exports = {
  upload,
};