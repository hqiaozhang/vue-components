/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-24 17:20:39 
 * @Email: 991034150@qq.com 
 * @Description: 获取最近的室内空气质量
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-03 15:33:27
 */

export default {
  url: '/aqi-health/getInDoorAqi',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode": 2000,
    "erroMsg": null,
    "result": {
      describe: '舒适',
      value: 127,
      chartData: {
        value: [[0.3, 0.3 - 0.05]],
        level: 2
      },
    }
  }
}