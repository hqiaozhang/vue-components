/**
 * @Author:      zhanghq
 * @DateTime:    2017-09-21 10:01:04
 * @Description: 折线图mock
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-09-21 10:01:04
 */
export default {
  url: '/line',
  mock: {
     "erroCode": 2000,
    "erroMsg": null,
    'result|5-10': [
      {
        'name|+1': ['18点', '21点', '0点', '3点', '6点', '9点', '12点'], // 中文名称
        'tongbi|1-100': 1, // 同比数据
        'huanbi|1-100': 1, // 环比数据
        'value|1-100': 1 // 数值
      }
    ]
  }
}
