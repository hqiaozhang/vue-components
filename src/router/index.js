/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-29 21:07:35
 * @Description: 路由配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 22:22:58
 */

import Vue from 'vue'
import Router from 'vue-router'

// 首页
const Home = () => import('@/containers/home.vue')

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/wmfe-components/home',
    component: Home // 首页
  },
  {
    path: '/wmfe-components/home',
    component: Home // 首页
  }
]

export default new Router({
  mode: 'history',
  routes
})
