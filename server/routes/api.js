/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:32:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-14 17:49:12
 */
const Router = require('koa-router')
const router = new Router()

let topBgCtrl = require('../controller/base/topBg')
router.get('/topbg/list', topBgCtrl.list)

let userCtrl = require('../controller/base/user')
router.post('/user/login', userCtrl.login)
router.get('/user/userInfo', userCtrl.userInfo)
router.get('/user/updateUserInfo', userCtrl.updateUserInfo)
// router.get('/user/createUser', userCtrl.createUser)

let articleCtrl = require('../controller/article/article')
router.get('/article/list', articleCtrl.list)
router.post('/article/create', articleCtrl.create)
router.get('/article/detail', articleCtrl.detail)
router.get('/article/viewsUp', articleCtrl.viewsUp)

router.get('/', async (ctx) => {
  ctx.body = {
    msg: 'hello koa'
  }
})

module.exports = router