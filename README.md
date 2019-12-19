# 本地文件上传七牛

## 下载

```bash
npm install @mengmaxx/qn_upload

```

## 使用

```js
const QnUpload = require('@mengmaxx/qn_upload')

const upload = new QnUpload({
  bucket: 'bucket', // 命名空间
  accessKey: '',
  secketKey: ''
}, filePath, key)

//  methods
upload.upload()

```