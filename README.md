# webpack 项目

## 简单的配置

```js
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|gif|png)$/,
        use: {
          // loader: 'file-loader',
          // url-loader可以把静态图片打包成base64放到打包后的js文件中
          loader: 'url-loader',
          options: {
            // 配置打包后的图片名字、hash值和后缀名
            name: '[name]_[hash].[ext]',
            // 配置打包后图片存放的目录
            outputPath: 'images/',
            // 大于limit的值，url-loader则单独打包不转化成base64
            limit: 2048,
          },
        },
      },
    ],
  },
};
```
