/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 09:42:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-29 09:33:10
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
        
        model.find(query, (err, findResult) => {
            if (err) {
                console.log(err)
                return ctx.body = result.errorResult('error', null)
            } else {
                console.log(findResult);
                if (!findResult) {
                    return ctx.body = result.errorResult('账号不存在', null)
                } else if (findResult.password !== password) {
                    return ctx.body = result.errorResult('密码错误', null)
                } else {
                    let token = Jwt.generateToken({
                        _id: findResult._id
                    });
                    console.log(token)
                    return ctx.body = result.defaultResult('登录成功', {
                        token
                    })
                }
            }
        })
    },
    async userInfo(ctx) {
        let {
            userId
        } = ctx.query
        let findResult = await model.findById(userId)
        if (!findResult) {
            return ctx.body = result.errorResult('用户信息不存在', null)
        } else {
            return ctx.body = result.defaultResult('success', {
                userInfo: findResult
            })
        }
    }
}