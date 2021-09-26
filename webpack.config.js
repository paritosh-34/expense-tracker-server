/* eslint-disable */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    app: ['./src/index.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@logger': path.resolve(__dirname, 'src/logger'),
      '@db': path.resolve(__dirname, 'src/db'),
    },
    extensions: ['.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
};
