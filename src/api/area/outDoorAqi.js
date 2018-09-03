/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-23 15:58:04 
 * @Email: 991034150@qq.com 
 * @Description: 室外AQI数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-23 18:21:48
 */



export default {
  url: '/aqi-health/getOutDoorAqi',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result": {
      "level":2,
      "advice":"空气很差，大家应减少外出，并关好门窗。",
      "aqi": 90,
      "rain_advise":""
    }
  }
}