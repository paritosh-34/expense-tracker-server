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
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@joiSchemas': path.resolve(__dirname, 'src/joiSchemas'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
    extensions: ['.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
};
