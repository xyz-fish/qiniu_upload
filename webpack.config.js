const path = require('path')

module.exports = {
  target: 'node',

  mode: 'production',

  entry: './src/index',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'qiniuUpload',
    umdNamedDefine: true
  }
}