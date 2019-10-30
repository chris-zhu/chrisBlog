/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-25 12:38:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-29 20:24:53
 */
// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
// 创建 token 类
const secert = "Chris"

const Jwt = {
    //生成token
    generateToken(payload) {
        let token = jwt.sign(payload, secert, {
            expiresIn: '2h' //过期时间
        });
        return token;
    },
    // 校验token
    verifyToken(token) {
        let result;
        try {
            jwt.verify(token, secert, (err, data) => {
                if (err) result = 'error'
                else result = data
            })
        } catch (err) {
            result = 'error'
        }
        return result
    }
}

module.exports = Jwt;