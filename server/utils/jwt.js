/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-25 12:38:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-28 21:55:07
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
    }
    // 校验token
    // verifyToken(token) {
    //     let res;
    //     try {
    //         jwt.verify(token, secert, (err, res) => {
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 return res
    //             }
    //         });
    //         res = true
    //     } catch (e) {
    //         console.log(e)
    //         res = 'err';
    //     }
    //     return res;
    // }
}

module.exports = Jwt;