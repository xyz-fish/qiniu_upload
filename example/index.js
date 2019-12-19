const path = require('path')
const QiniuUpload = require('../index')

const upload = new QiniuUpload(
  {
    accessKey: 'qiniu accessKey',
    secretKey: 'qiniu secretKey'
  },
  path.resolve(__dirname, 'logo.png'),
  'logo.png'
)

upload.upload()