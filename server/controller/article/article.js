/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 09:42:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-14 17:48:36
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let _ = require('lodash')
let result = require('../../utils/result')
let schema = new Schema({
  title: {
    type: String,
    default: null
  },
  desc: {
    type: String,
    default: null
  },
  cover: {
    type: String,
    default: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/preview.gif'
  },
  content: {
    type: String,
    default: null
  },
  outlink: {
    type: String,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  tags: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users_t'
  },
  isActive: {
    type: Boolean,
    default: true
  },
})

let model = mongoose.model('articles', schema, 'articles')

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
      isActive: true
    }
    let findResult = await model.find(query).skip(skip).limit(pagesize).populate('author', 'avatar name')
    return ctx.body = result.defaultResult('success', findResult)
  },
  async create(ctx) {
    let {
      _id,
      title,
      desc,
      cover,
      content,
      outlink,
      tags
    } = ctx.request.body
    let one = {
      author: _id,
      title,
      desc,
      content,
      outlink,
      tags
    }
    if (cover) one.cover = cover
    let createResult = await model.create(one)
    return ctx.body = result.defaultResult('success', createResult)
  },
  async detail(ctx) {
    let {
      articleId
    } = ctx.query
    if (!articleId) {
      return ctx.body = result.errorResult('error', {})
    }
    let findResult = await model.findById(articleId).populate('author', 'avatar name')
    return ctx.body = result.defaultResult('success', findResult)
  },
  async viewsUp(ctx) {
    let {
      articleId
    } = ctx.query
    let one = await model.findById(articleId)
    if (!one) return ctx.body = result.errorResult('无效的_id')
    one.views++
    let res = await one.save()
    return ctx.body = result.defaultResult('success', res)
  }
}