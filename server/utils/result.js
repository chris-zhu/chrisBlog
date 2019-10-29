/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 10:11:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-28 22:37:28
 */
let defaultResult = function (msg = 'success', data = {}, status = 200) {
    return {
        msg: msg,
        data: data,
        status: status
    }
}

let errorResult = function (msg = '未知错误', data = {}, status = 401) {
    return {
        msg: msg,
        data: data,
        status: status
    }
}

module.exports = {
    defaultResult,
    errorResult
};