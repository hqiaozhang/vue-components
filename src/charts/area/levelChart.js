/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 1-3级标准面积图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-03 15:41:07
 */

import echarts from "echarts"
import { merge } from "lodash"
import {pollutantFormat} from "@/util/util.js"
 
let colors = [
	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		offset: 1,
		color: 'rgba(123, 229, 90, 0.9)' // 绿
	}, {
		offset: 0,
		color: 'rgba(123, 229, 90, 0.9)' // 绿
	}]),
	// 大于二级标准
	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		offset: 1,
		color: 'rgba(123, 229, 90, 0.9)' // 绿
	}, {
		offset: 0,
		color: 'rgba(254, 221, 50, 0.9)' // 黄
	}]),
	// 大于三级标准
	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		offset: 1,
		color: 'rgba(123, 229, 90, 0.9)' // 绿
	}, {
		offset: 0.5,
		color: 'rgba(254, 221, 50, 0.9)' // 黄
	},{
		offset: 0,
		color: 'rgba(249, 49, 72, 0.9)' // 红
	}]),
	// 大于三级标准
	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		offset: 1,
		color: 'rgba(123, 229, 90, 0.9)' // 绿
	}, {
		offset: 0.3,
		color: 'rgba(254, 221, 50, 0.9)' // 黄
	},{
		offset: 0.2,
		color: 'rgba(249, 49, 72, 0.9)' // 红
	}]),
]


export default {
	template: '<div class="test"></div>',
	data() {
		return {
			// 默认配置项
			lineColor: ['#7be55a', '#fedd32', '#f6354d'],
			lineName: ['一级标准', '二级标准', '三极标准'],
			defaultSetting: {
				backgroundColor: '#1a3f7f',
				tooltip: {
					trigger: 'axis',
				},
				grid: {
					left: 40,
					right: 10,
					// top: 10,
					bottom: 50
				},
				xAxis: {
					type: 'category',
					axisLabel: {
						color: '#fff',
						rotate: 45,
						fontSize: 17,
						interval : 0,
						formatter : function(value, index){
							if(value.indexOf(':00') !== -1){
									return  value
							}else {
								return '' 
							}
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					 
				},
				yAxis: {
					type: 'value',
					splitLine: {
						lineStyle: {
							color: '#1e4689',
							width: 2,
						}
					},
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#fff',
						fontSize: 17,
					}
				},
				series: [{
					data: [],
					type: 'line',
					name: '数据',
					showSymbol: false,
					smooth: true,
					itemStyle: {
						normal: {
							color: "#fff"
						},
					},
					areaStyle: {
						normal: {
							color: colors[0],
						}
					},
					lineStyle: {
						width: 3,
					},
				}
			]
			}
		}
	},
	props: {
		selector: String,
		sourceData: Object,
		option: Object, // 配置项
		pollution: String // 污染物

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
			let data = self.sourceData.result
			if(_.isEmpty(data)) {
				return self.myChart.clear()
			}
			const { level_1, level_2, level_3, max_y } = self.sourceData
			let option = self.options
			
			let level1Data = []
			let level2Data = []
			let level3Data = []
			let maxData = []
			let yData = []
			let levesData = []
			
			for(let i = 0; i< data.length; i++) {
				level1Data.push(level_1)
				level2Data.push(level_2)
				level3Data.push(level_3)
				let value = data[i].value
				yData.push(value > 1 ? Math.ceil(data[i].value) : Number(value).toFixed(2) )
				maxData.push(max_y)
			}
			let max = Math.max(...yData)
			let fillColor = colors[0]
			// 24小时数据最大值大于该污染物的一极标准，小于二极标准
			if(max > level_1 && max < level_2) {
				fillColor = colors[0]
				levesData = [level1Data, level2Data]
				yData.push(level_1, level_2)
			}
			// 24小时数据最大值小于等于该污染物的二极标准 
			if(max <= level_2) {
				fillColor = colors[1]
				levesData = [level1Data, level2Data]
				yData.push(level_1, level_2)
			}
			// 24小时数据最大值大于该污染物的二极标准，小于等于三极标准
			if(max > level_2 && max <= level_3) {
				fillColor = colors[2]
				// 填充占比计算
				fillColor.colorStops[1].offset = 1 - level_2 / max
				levesData = [level1Data, level2Data, level3Data]
				yData.push(level_1, level_2)
			}
			// 24小时数据最大值大于该污染物的三极标准，小于最大值
			if(max > level_3 && max < max_y) {
				fillColor = colors[3]
				levesData = [level1Data, level2Data, level3Data]
				yData.push(level_1, level_2, level_3)
			}
			// 24小时数据最大值大于该污染物的最大值
			if(max > max_y) {
				fillColor = colors[3]
				levesData = [level1Data, level2Data, level3Data]
				yData.push(level_1, level_2, level_3, max_y, maxData)
			}
			const { lineColor,  lineName}  = this
			// 标准线
			let levelSeries = levesData.map((item, index) => {
				return {
					data: item,
					type: 'line',
					name: lineName[index],
					showSymbol: false,
					smooth: false,
					lineStyle: {
						type: 'dotted'
					},
					itemStyle: {
						normal: {
							color: lineColor[index]
						},
					},
					emphasis: {
						itemStyle: {
							color: 'none',
							borderColor: 'none'
						}
					}
				}
			})
			
			let maxLen = String(Math.max(...yData)).length
			option.series[0].data = data 
			option.series[0].areaStyle.normal.color = fillColor // 填充色 
			option.series = [option.series[0], ...levelSeries]
			let xAxis = [];
			self.sourceData.result.map(item => {
				xAxis.push(item.rtcTime.slice(11, 16));
			});
			let xlen = xAxis.length
			// 解决最后一个为整点时不渲染问题，添加一个空数据
			if(xAxis[xlen - 1].indexOf(':00') !== -1) {
				xAxis.push('0')
			}
			// xAxis.push('0')
			option.xAxis.data = xAxis
			option.grid.left =  maxLen * 15
			this.formatterTooltip()
			self.myChart.clear()
			self.myChart.setOption(option)
			// 监听窗口变化
			window.addEventListener('resize', function () {
				self.myChart.resize()
			})
		},
		/**格式化 Tooltip*/
		formatterTooltip() {
			let self = this
			let { options, pollution } = this
			let data = self.sourceData.result
			options.tooltip.formatter = (params) => {
				let html = '';
				if (params.length > 0) {
					let tooltipDate = data[params[0].dataIndex].rtcTime
					let value = params[0].value;
					html += `<div class='chart-tooltip'>${tooltipDate}<br/>`
					html += `<b style='color:#fff; font-size: 16px'> ●</b><span style='padding-left:10px; margin: 0'>${pollutantFormat(pollution)}：${value}</span>`
					return html += "</div>";
				}
			}
		}
	},
	/*
	 * 监听参数变化  
	 */
	watch: {
		'sourceData.result': function() {
			this.initChart()
		}
	}
}


