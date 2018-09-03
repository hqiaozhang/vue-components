/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 水球图表
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-31 18:19:02
 */

import echarts from "echarts"
import 'echarts-liquidfill'
import { merge } from "lodash"

const colors = [
	// 完美颜色
	[{
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: '#a9f382' // 0% 处的颜色
		}, {
			offset: 1,
			color: '#78e651' // 100% 处的颜色
		}],
		globalCoord: false // 缺省为 false
	}, 'rgba(167, 243, 128, 0.4)'],
	// 极好颜色
	[{
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: '#dcf14e' // 0% 处的颜色
		}, {
			offset: 1,
			color: '#c3e632' // 100% 处的颜色
		}],
		globalCoord: false // 缺省为 false
	}, 'rgba(220, 241, 78, 0.4)'],
	// 舒适颜色
	[{
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: '#fff005' // 0% 处的颜色
		}, {
			offset: 1,
			color: '#fee002' // 100% 处的颜色
		}],
		globalCoord: false // 缺省为 false
	}, 'rgba(255, 240, 5, 0.4)'],
	// 适宜颜色
	[{
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: '#fbad4a' // 0% 处的颜色
		}, {
			offset: 1,
			color: '#f67d29' // 100% 处的颜色
		}],
		globalCoord: false // 缺省为 false
	}, 'rgba(251, 173, 74, 0.4)'],
	// 净化颜色
	[{
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: '#fc5c7b' // 0% 处的颜色
		}, {
			offset: 1,
			color: '#f9354d' // 100% 处的颜色
		}],
		globalCoord: false // 缺省为 false
	}, 'rgba(252, 92, 123, 0.4)'],
]


export default {
	template: '<div></div>',
	data() {
		return {
			// 默认配置项
			defaultSetting: {
				itemConfig: {
					type: 'liquidFill',
					radius: '95%',
					backgroundStyle: {
						borderWidth: 5,
						borderColor: '#fff',
						color: '#1f437f'
					},
					outline: {
						show: false
					},
				}
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
			let data = self.sourceData.value
			if (_.isEmpty(data)) {
				return
			}
			const { level } = this.sourceData
			let option = self.options
			let series = data.map(item => {
				return Object.assign({}, option.itemConfig, {
					data: item,
					label: {
						formatter: function () {
							return ''
						},
						color: '#fff',
						fontSize: 50,
					},
					color: colors[level - 1]
				})
			})
			option.series = series
			self.myChart.clear()
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
