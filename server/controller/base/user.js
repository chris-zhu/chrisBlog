/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 09:42:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-31 17:15:19
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let _ = require('lodash')
let result = require('../../utils/result')
let Jwt = require('../../utils/jwt');
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
    topBg: {
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
            let token = Jwt.generateToken({
                _id: findResult._id
            });
            return ctx.body = result.defaultResult('登录成功', {
                token
            })
        }
    },
    async userInfo(ctx) {
        let {
            _id
        } = ctx.query
        let findResult = await model.findById(_id, {
            'account': 0,
            'password': 0
        })
        if (!findResult) {
            return ctx.body = result.errorResult('用户信息不存在', null)
        } else {
            return ctx.body = result.defaultResult('success', {
                userInfo: findResult
            })
        }
    },
    async updateUserInfo(ctx) {
        let {
            _id
        } = ctx.query
        const params = {
            ...ctx.query
        }
        delete params._id
        const query = {
            _id
        }
        let findResult = await model.update(query, params)
        if (!findResult) {
            return ctx.body = result.errorResult('error', null)
        } else {
            return ctx.body = result.defaultResult('success', {
                userInfo: findResult
            })
        }
    },
    async createUser(ctx) {
        let findResult = await model.create({})
        return ctx.body = result.defaultResult('success', {
            userInfo: findResult
        })
    }
}