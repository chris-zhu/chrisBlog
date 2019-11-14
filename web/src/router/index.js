/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 16:56:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-13 15:52:01
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home')
  }, {
    path: '/release',
    name: 'release',
    component: () => import('@/views/release')
  },
  {
    path: '/details/:_id',
    name: 'detailArticle',
    component: () => import('@/views/details/article')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router