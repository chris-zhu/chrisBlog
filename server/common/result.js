/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 10:11:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-23 10:12:03
 */
let defaultResult = function (msg = 'success', data = {}, error = 0) {
    return {
        // status: status,
        // message: msg,
        // content: data,
        msg: msg,
        data: data,
        error: error,
    }
}

let errorResult = function (msg = '未知错误', data = {}, error = 1) {
    return {
        // status: status,
        // message: msg,
        // content: data,
        msg: msg,
        data: data,
        error: error,
    }
}

let sqlErrorResult = function (msg = 'sql查询错误', data = {}, error = 2) {
    return {
        msg: msg,
        data: data,
        error: error,
    }
}

module.exports = {
    defaultResult,
    errorResult,
    sqlErrorResult,
};