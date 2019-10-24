/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-24 12:52:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 14:15:55
 */

export function getToken() {
    return localStorage.getItem('token')
}

export function setToken(token) {
    return localStorage.setItem('token', token)
}

export function removeToken() {
    return localStorage.removeItem('token')
}
