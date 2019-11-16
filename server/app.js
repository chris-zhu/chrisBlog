/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:08:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-15 10:11:02
 */
const Koa = require('koa')
const connectDb = require('./config/db') //链接数据库
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const path = require('path')
const JwtUtil = require('./utils/jwt')
const Result = require('./utils/result')
const notVerifyRoutes = require('./utils/notVerify') //不需要验证的路由
const router = require('./routes')

const app = new Koa()

//connect database
connectDb()

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

//设置跨域请求npm
app.use(async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
  });
  await next();
});

//设置token验证
app.use(async (ctx, next) => {
  let route = ctx.request.url.split('?')[0]
  if (!notVerifyRoutes.includes(route)) {
    let token = ctx.header.authorization
    let res = JwtUtil.verifyToken(token);
    if (res === 'error') return ctx.body = Result.errorResult('登录已过期,请重新登录', null)
    else {
      let method = ctx.method.toUpperCase()
      if (method === 'POST') ctx.request.body._id = res._id
      else if (method === 'GET') ctx.query._id = res._id
    }
  }
  await next();
});

//路由
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