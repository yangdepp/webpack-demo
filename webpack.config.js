const path = require('path');

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
      {
        test: /\.scss$/,
        /**
         * css-loader会分析css文件的彼此依赖
         * style-loader会根据css-loader分析生成的文件，挂在到html的style标签中
         */
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // scss中引入的scss文件引入之前，走下面2个loader
              importLoaders: 2,
              // 开启css modules
              modules: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
};
