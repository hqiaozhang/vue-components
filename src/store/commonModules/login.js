/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-06 15:54:54 
 * @Email: 991034150@qq.com 
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-07 22:59:27
 */
 
import { getCookie } from '@/util/util'
let userId = getCookie('userId')
const state = {
  logged: !userId,
  cityId: getCookie('cityId'),
  cityName: decodeURI(getCookie('cityName')),
}

// getters
const getters = {
  logged: state => state.logged,
  cityId: state => state.cityId,
  cityName: state => state.cityName,
}
 
// 登录mutations
const mutations = {
  /**
   * @description 设置登录状态
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setLoginState (state, logged) {
    state.logged = logged
  },
  
  /**
   * @description 设置地区信息(id,名称)
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setAreaInfo (state, city) {
    state.cityId = city.id
    state.cityName = city.domainName
  }
}

export default {
  state,
  getters,
  mutations
}
