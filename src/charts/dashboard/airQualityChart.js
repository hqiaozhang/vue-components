/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 面积图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-03 11:20:48
 */

import echarts from "echarts"
import { merge } from "lodash"
const colorLevel = ['#77E750', '#FFDF02', '#F67825', '#F93148', '#99004C', '#690000']

export default {
  template: '<div></div>',
  data() {
    return {
      // 默认配置项
      defaultSetting: {
        polar: {
          //center: ['50%', '54%']
        },
        visualMap: {
          show: false,
          seriesIndex: 1,
          dimension: 1,
          type: 'continuous',
          min: 0,
          max: 1000,
          // text: ['High', 'Low'],
          realtime: false,
          calculable: false,
          color: ['#f67825']
        },
        angleAxis: {
          type: 'value',
          max: 1000,
          startAngle: 180,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        radiusAxis: {
          min: 0,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: 'line',
          type: 'line',
          coordinateSystem: 'polar',
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 20,
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0, [{
                  offset: 0,
                  color: '#77E750'
                },
                {
                  offset: 1,
                  color: '#77E750'
                }
                ])
            }
          },
        }, {
          animationDelay: 400,
          animationEasingUpdate: 400,
          name: 'point',
          type: 'scatter',
          coordinateSystem: 'polar',
          symbolSize: 17,
          hoverAnimation: false,
          cursor: 'default',
          color: '#f67825',
          itemStyle: { 
            normal: {
              borderWidth: 0,
              shadowBlur: 5,
              shadowColor: '#fff'
            }
          },
          data: [[9.6, 90]]
        }],
        animationDuration: 6000
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
      let option = self.options
      if(_.isEmpty(this.sourceData)) {
        return
      }
      const { value, level } = this.sourceData
      let data = [];
      var angleValue = 0;
      if (value<=200) {
        angleValue = (500*4/6)/200 * value;
      } if (value>200 && value<=300) {
        angleValue = (value-200)/100*(500/6)+500*4/6;
      } if (value>300 && value<=500) {
        angleValue = (value-300)/200*(500/6)+500*5/6;
      } if (value>500) {
        angleValue = 500;
      }
      for (let i = 0; i <= angleValue; i++) {
        let t = (i / 180) * Math.PI;
        let r = 10;
        data.push([r, i]);
      }
      let fillColor = []
      for(let j = 0; j < level; j++) {
        fillColor.push({
          offset: level === 1 ? 1 : 1 / (level - 1) * j,
          color: colorLevel[j]
        }) 
      }
      let gradient =  new echarts.graphic.LinearGradient(
        0, 0, 1, 0, fillColor)
      option.series[0].data = data
      option.series[0].lineStyle.normal.color = gradient
      option.series[1].data = [[9.6, angleValue]]
      option.visualMap.color = [colorLevel[level - 1]]
      option.series[1].animationDelay = level * 100 + 500
 
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


