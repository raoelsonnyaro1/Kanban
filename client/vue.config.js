const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/',
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)$/i)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,
      });
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace with the URL of your Node.js server
        changeOrigin: true,
      },
    },
  },
})
