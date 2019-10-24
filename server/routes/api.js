/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:32:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-23 10:15:13
 */
const Router = require('koa-router')
const router = new Router()

let topBgCtrl = require('../controller/base/topBg')
router.get('/topbg/list',topBgCtrl.list)

router.get('/', async (ctx) => {
    ctx.body = {
        msg: 'hello koa'
    }
})

module.exports = router