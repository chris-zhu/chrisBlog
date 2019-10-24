/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:32:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 15:30:57
 */
const Router = require('koa-router')
const router = new Router()

let topBgCtrl = require('../controller/base/topBg')
router.get('/topbg/list', topBgCtrl.list)

router.get('/', async (ctx) => {
    ctx.body = {
        msg: 'hello koa'
    }
})
router.post('/login', async (ctx) => {
    let {account,password} = ctx.request.body
    ctx.body = {
        msg: `post:--->账号是: ${account}  ,密码是: ${password}`,
    }
})
router.get('/login', async (ctx) => {
    let {
        account,
        password
    } = ctx.query
    ctx.body = {
        msg: `get:--->账号是:${account},密码是:${password}`,
    }
})

module.exports = router