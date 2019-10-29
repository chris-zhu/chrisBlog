/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 09:42:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-25 12:40:20
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let _ = require('lodash')
let result = require('../../utils/result')

let schema = new Schema({
    id: {
        type: Number,
        require
    },
    product_name: {
        type: String,
        require
    },
    price: {
        type: Number,
        default: 0
    },
    coin_type: {
        type: Number,
        default: 0
    },
    vip_free: {
        type: Number,
        default: 0
    },
    s_immg: {
        type: String,
        default: ''
    },
    l_img: {
        type: String,
        default: ''
    },
    thumbnail_img: {
        type: String,
        default: ''
    },
    sort_num: {
        type: Number,
        default: 0
    },
    is_disable: {
        type: Number,
        default: 0
    },
    expire: {
        type: Number,
        default: 0
    },
    had: {
        type: Number,
        default: 0
    },
})

let model = mongoose.model('topBgs', schema, 'topBgs')

module.exports = {
    model,
    async list(ctx) {
        let {
            page,
            pagesize
        } = ctx.query
        page = _.toInteger(page)
        page = page ? page : 0
        pagesize = _.toInteger(pagesize)
        pagesize = pagesize ? pagesize : 20
        let skip = page * pagesize
        let query = {
            is_disable: 0
        }
        let data = await model.find(query).sort({
            id: 1
        }).skip(skip).limit(pagesize)
        let total = await model.countDocuments(query)
        return ctx.body = result.defaultResult('', {
            data,
            total
        })
    }
}