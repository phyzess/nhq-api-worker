const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: `worker.js`,
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'source-map',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
}
