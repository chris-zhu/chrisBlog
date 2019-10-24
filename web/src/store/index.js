/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 23:11:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 14:14:46
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from "./modules/user";

export default new Vuex.Store({
  modules: {
    user
  }
})