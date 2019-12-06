/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-30 20:17:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-30 20:28:53
 */
module.exports = {
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