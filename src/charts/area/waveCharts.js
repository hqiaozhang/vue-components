/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 面积图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-21 22:38:39
 */

import echarts from "echarts"
import 'echarts-liquidfill'
import { merge } from "lodash"
let color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0,
  color: '#00b0ff'
}, {
  offset: 0.8,
  color: '#7052f4'
}], false)
console.log(color)
export default {
	template: '<div></div>',
	data() {
		return {
			// 默认配置项
			defaultSetting: {
        series: [{
          type: 'liquidFill',
         
        data: [0.8, 0.75],
        backgroundStyle: {
          borderWidth: 5,
          borderColor: '#fff',
          color: '#1f437f'
        },
        outline: {
          show: false
      },
      color: ['#8fe96d'],
      label: {
        formatter: '{c}',
        fontSize: 28
      }
      }]
			}
		}
	},
	props: {
		selector: String,
		sourceData: Object,
		option: Object, // 配置项
	},
	mounted() {
		this.options = merge({}, this.defaultSetting, this.option)
    // 初始化图表
    
    this.myChart = echarts.init(document.querySelector(this.selector))
		this.initChart()
	},
	methods: {
		/*
		* 初始化图表 
		*/
		initChart() {
			let self = this
			let data = self.sourceData
			let option = self.options
      self.myChart.setOption(option)
		},
 
	},
	/*
	 * 监听参数变化  
	 */
	watch: {
		'sourceData': 'initChart'
	}
}


