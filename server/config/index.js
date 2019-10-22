/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 21:40:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-22 22:08:28
 */
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

module.exports = mongodbConnection