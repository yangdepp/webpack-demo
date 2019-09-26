const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
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
      // 配置babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // options配置内容可以转移至.babelrc中
        options: {},
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  // 配置code-spliting
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
