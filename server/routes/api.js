/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:32:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-22 21:57:06
 */
const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx) => {
    ctx.body = {
        msg: 'hello koa'
    }
})

module.exports = router