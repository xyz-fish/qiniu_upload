
const qiniu = require('qiniu')
const config = new qiniu.conf.Config()
class QiniuUpload {
  constructor (qiuniuConfig, filepath, key) {
    this.config = qiuniuConfig
    this.filepath = filepath
    this.key = key
  }

  uptoken (key) {
    const options = {
      scope: `${this.config.bucket}:${key}`,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    }
    const mac = new qiniu.auth.digest.Mac(this.config.accessKey, this.config.secretKey)
    const putPolicy = new qiniu.rs.PutPolicy(options)
    return putPolicy.uploadToken(mac)
  }

  uploadFile (uploadToken, key, filepath) {
    const putExtra = new qiniu.form_up.PutExtra()
    const formUploader = new qiniu.form_up.FormUploader(config)
    new Promise(function (resolve, reject) {
      formUploader.putFile(uploadToken, key, filepath, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
          throw respErr
        }
        if (respInfo.statusCode == 200) {
          console.log(respBody)
          resolve(respBody)
        } else {
          reject({
            respBody,
            respInfo
          })
          console.log(respInfo.statusCode)
          console.log(respBody)
        }
      })
    })
  }

  upload (filepath, key) {
    const token = this.uptoken(key)
    this.uploadFile(token, key, filepath)
  }
}

module.exports = QiniuUpload