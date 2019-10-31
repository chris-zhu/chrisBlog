/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-24 13:35:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-31 16:50:03
 */
import {
    getToken,
    setToken
} from "../../utils/auth";

const state = {
    token: getToken(),
    userInfo: {}
}
const getters = {
    token: state => state.token,
    userInfo: state => state.userInfo,
}
const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    }
}
const actions = {
    RefreshToken: ({
        commit
    }, token) => {
        setToken(token)
        commit('SET_TOKEN', token)
    },
    RefreshUserInfo: ({
        commit
    }, userInfo) => {
        commit('SET_USERINFO', userInfo)
    }
}
const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default user