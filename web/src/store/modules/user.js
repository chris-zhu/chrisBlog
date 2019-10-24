/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-24 13:35:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 14:11:55
 */
import {
    getToken,
    setToken
} from "../../utils/auth";

const state = {
    userId: '',
    token: getToken()
}
const getters = {
    userId: state => state.userId,
    token: state => state.token
}
const mutations = {
    SET_USERID(state, userId) {
        state.userId = userId
    },
    SET_TOKEN(state, token) {
        state.token = token
    }
}
const actions = {
    refreshUserId({
        commit
    }, userId) {
        commit('SET_USERID', userId)
    },
    RefreshToken: ({
        commit
    }, token) => {
        setToken(token)
        commit('SET_TOKEN', token)
    },
}
const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default user