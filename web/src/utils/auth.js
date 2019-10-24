/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-24 12:52:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 13:30:09
 */

function getToken() {
    return localStorage.getItem('token')
}

function setToken(token) {
    return localStorage.setItem('token', token)
}

function removeToken() {
    return localStorage.removeItem('token')
}

export default {
    getToken,
    setToken,
    removeToken
}