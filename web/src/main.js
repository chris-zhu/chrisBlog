/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 23:11:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 13:37:25
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

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')