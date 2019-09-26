const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  /**
   * 设置源码和打包后文件的映射关系,
   * cheap-inline-source-map只精确到行,不包括第三方
   * cheap-module-inline-source-map包含第三方
   * 最佳实践：development 使用 cheap-module-eval-source-map
   * production 使用 cheap-module-source-map
   */
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js',
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 1024,
    // hot module replacement
    hot: true,
    hotOnly: true,
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // 设置打包后js文件引入的前缀
    // publicPath: 'http://cdn.com.cn',
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
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader',
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
              // modules: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
