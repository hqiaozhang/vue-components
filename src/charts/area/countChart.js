/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 面积图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-21 22:41:50
 */

import echarts from "echarts"
import { merge } from "lodash"
 

export default {
	template: '<div></div>',
	data() {
		return {
			// 默认配置项
			defaultSetting: {
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			},
			tooltip: {
				trigger: 'axis'
			},
			yAxis: {
					type: 'value',
					splitLine: {
							lineStyle: {
									type: 'dashed'
							}
					},
					axisLine: {
							show: false
					},
					axisTick: {
							show: false
					},
					axisLabel: {
							formatter: '{value} k'
					}
			},
			series: [{
					data: [3, 5, 3, 5, 3, 5, 3,5,8,5],
					type: 'line',
					showSymbol: false,
					smooth: true,
					itemStyle: {
							normal: {
									color: "#16D9F0"
							},
					},
					areaStyle: {
							normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: '#16D9F0'
									}, {
											offset: 1,
											color: '#fff'
									}])
							}
					},
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
			// 监听窗口变化
			window.addEventListener('resize', function () {
				self.myChart.resize()
			})
		},
		/**格式化 Tooltip*/
		formatterTooltip() {
			let self = this
			let { options, pollution, defaultSetting } = this
			let dataIndex = 0
			let colors = defaultSetting.color
			options.tooltip.formatter = (params) => {
				let html = "";
				if (params.length > 0) {
					let name = params[0].name
					let index = params[0].dataIndex
					let tooltipDate = self.date.slice(0, 10)
					if (name === '00') {
						dataIndex = index
					}
					if (index >= dataIndex) {
						tooltipDate = dateFormat("yyyy-MM-dd", 1) // 00开始点是明天开始
					}
					html += `<div class='chart-tooltip'>${tooltipDate}  ${name}:00<br/>`
					for (let i = 0; i < params.length; i++) {
						let value = params[i].value;
						let seriesName = params[i].seriesName
						html += `<b style='color: ${colors[i]}; font-size: 16px'> ●</b>${seriesName}<br /><p style='padding-left: 20px; margin: 0'>${ pollutantFormat(pollution)}：${value}</p>`

					}
					return html += "</div>";
				}
			}
		}
	},
	/*
	 * 监听参数变化  
	 */
	watch: {
		'sourceData': 'initChart'
	}
}


