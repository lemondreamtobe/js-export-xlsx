const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
   // 输出文件的名称
    filename: 'index.js',
    // 输出文件的存放目录
    path: path.resolve(__dirname, 'lib'),
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'commonjs2',
  },

  // 输出 Source Map
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件，
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换。
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.less$/, // 条件匹配 也可以是正则数组

        // 只命中src目录里的css文件，加快 Webpack 搜索速度
        // include: path.resolve(__dirname, 'src'), // 也可以是路径数组

        // 排除 node_modules 目录下的文件
        // exclude: path.resolve(__dirname, 'node_modules'), // 也可以是路径数组 数组里的每项之间是或的关系，即文件路径符合数组中的任何一个条件就会被命中

        use: [ // 应用哪些loader
          MiniCssExtractPlugin.loader, // 一组 Loader 的执行顺序默认是从右到左执行，通过 enforce 选项可以让其中一个 Loader 的执行顺序放到最前或者最后
          {
            loader:'css-loader',
            options:{
              // minimize:true,
            }
          },
          {
            loader:'less-loader',
            options:{
              // minimize:true,
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],

  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块
  // 这些模块通过注册在运行环境中的全局变量访问，不用被重复打包进输出的代码里
  externals: /^(react|babel-runtime)/,

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin({
      parallel: false,
      uglifyOptions: {
        compress: {
          inline: false,
        },
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
      }
    })],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  }
};