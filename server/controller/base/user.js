/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 09:42:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 23:36:53
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let _ = require('lodash')
let result = require('../../common/result')
let jwt = require('jsonwebtoken');
let schema = new Schema({
    name: {
        type: String,
        default: null
    },
    account: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: 'male'
    },
    avatar: {
        type: String,
        default: null
    },
    sign: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
})

let model = mongoose.model('users_t', schema, 'users_t')

module.exports = {
    model,
    async login(ctx) {
        let {
            account,
            password
        } = ctx.request.body
        let query = {
            account
        }
        let findResult = await model.findOne(query)
        if (!findResult) {
            return ctx.body = result.errorResult('账号不存在', null)
        } else if (findResult.password !== password) {
            return ctx.body = result.errorResult('密码错误', null)
        } else {
            let payload = {
                _id: findResult._id,
                time: new Date().getTime(),
                timeout: 1000 * 60 * 60 * 2
            }
            let token = jwt.sign(payload, 'Chris ');
            return ctx.body = result.defaultResult('登录成功', {
                token
            })
        }
    }
}