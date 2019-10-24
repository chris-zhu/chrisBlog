/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:08:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-23 09:22:15
 */
const Koa = require('koa')
const mongoose = require('mongoose') //链接数据库
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const path = require('path')

const app = new Koa()

app.use(xmlParser({
    limit: 1280,
    encoding: 'utf8', // lib will detect it from `content-type`
    xmlOptions: {
        explicitArray: false
    },
    onerror: (err, ctx) => {
        ctx.throw(err.status, err.message);
    }
}))
app.use(bodyParser())

//connect database
const connectDb = require('./config/db')
connectDb()

//路由
const router = require('./routes')
app.use(require('koa-static')(path.join(__dirname, '/public')))
app.use(router.routes()).use(router.allowedMethods());

//设置端口监听
const port = 5000;
app.listen(port, (err) => {
    if (!err) {
        console.log(`server run ${port}`)
    } else {
        console.log(err)
    }
})