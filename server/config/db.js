/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:40:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-23 09:40:53
 */

const mongoose = require('mongoose')
let config = {
    mongodb: {
        user: 'chris',
        password: '052598',
        host: 'localhost',
        port: '27017',
        db: 'chrisBlog'
    }
}

let mongodbConnection = 'mongodb://' + config.mongodb.user + ':' + config.mongodb.password + '@' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db

//连接
function connecteDb() {
    mongoose.connect(mongodbConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connect success')
    }).catch(err => {
        console.log(err)
    })

}

module.exports = connecteDb