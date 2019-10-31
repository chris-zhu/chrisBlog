/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-23 12:19:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-30 20:38:46
 */
import axios from 'axios';
import qs from 'qs';
import store from '../store'
import {
    getToken,
    removeToken
} from './auth';
import {
    Message
} from 'element-ui';

axios.defaults.timeout = 5000; //请求超时
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//http request 拦截器
axios.interceptors.request.use(config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(response => {
        if (response.status === 200 && response.data.status === 200) {
            let token = response.data.data.token
            if (token) {
                store.dispatch('user/RefreshToken', token)
            }
            return Promise.resolve(response);
        } else {
            removeToken()
            Message({
                message: response.data.msg,
                type: 'warning'
            })
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    // router.replace({
                    //     path: '/',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // });
                    Message({
                        message: '请先登录后操作',
                        type: 'warning'
                    })
                    break;

                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面                
                case 403:
                    Message({
                        message: '登录过期，请重新登录',
                        type: 'warning'
                    })
                    // 清除token
                    removeToken()
                    // 清理vuex的token
                    this.$store.dispatch('user/refreshUserId', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;

                    // 404请求不存在
                case 404:
                    Message({
                        message: '网络请求不存在',
                        type: 'error'
                    })
                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    Message({
                        message: error.response.data.message,
                        type: 'error'
                    })
            }
            return Promise.reject(error.response);
        }
    }
);


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function getApi(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postApi(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}