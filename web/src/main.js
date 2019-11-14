/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 23:11:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-14 09:39:58
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 16:56:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 13:36:29
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/css/main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";

Vue.config.productionTip = false
Vue.use(ElementUI);

/* 滚动条 */
import vuescroll from 'vuescroll'
Vue.use(vuescroll)

/* 粒子背景 */
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

/** 富文本 */
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')