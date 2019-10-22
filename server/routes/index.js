/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:31:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-22 21:33:05
 */
const api = require('./api');
const Router = require('koa-router');
const router = new Router();

router.use('/api', api.routes(), api.allowedMethods());
module.exports = router;