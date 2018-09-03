/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 11:41:43
 * @Email: 991034150@qq.com
 * @Description: 项目默认全局配置项
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-03 15:08:39
 */

//  const search = global.location.search

export default {
  // 是否使用mock模式，在mock模式下向服务器的请求被mockjs拦截
  mock: true, // search.indexOf('mock') !== -1,
  // 是否使用proxy模式，在proxy模式下会使用proxy的url来替换原来的url
  proxy: true,
  // 模拟websocket时，消息的推送间隔(毫秒)
  mockInterval: 3500,
  // 轮询请求时的时间间隔(毫秒)
  fetchInterval: 6000,
  // 主要用于前后台联调，代理服务器域名，当proxy为true时，所有ajax请求都会发送到这个域名
  proxyHost: '/backendApi',
  // 主要用于前后台联调，websocket代理服务器域名，当proxy为true时，所有websocket都会连接到这个域名
  websocketProxyHost: 'ws://192.168.5.16:8082/protal/bdcds',
  // 线上服务器域名，当访问URL时不加mock或proxy时，所有ajax请求都会发送到这个域名
  host: 'http://58.83.189.150:18888/backendApi',
  // websocket线上服务器域名，当访问URL时不加mock或proxy时，所有websocket都会连接到这个域名
  websocketHost: 'ws://58.83.189.150:18888/backendApi',
  // 地图路径
  mapHost: 'http://192.168.1.16:10088/mapdata/cq',
  // 是否使用zoom模式，在zoom模式下页面会根据窗口的宽高使用transform调整
  zoom: false,
  // 固定的页面宽
  pageWidth: 1920,
  // 固定的页面高
  pageHeight: 1080,
  // 地图路径
  // mapPath: 'http://localhost:8086/static/mapJson/',
  mapPath: 'http://58.83.189.150:18888/weather-web/resources/js/airMonitoring/domainbounds/',
  // 污染级别颜色
  levelColor: [],
}
