/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-30 20:17:39
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-19 17:41:28
 */
module.exports = {
  publicPath: './',
  // 输出文件目录
  outputDir: './dist',
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": '/api'
        }
      }
    }
  }
}