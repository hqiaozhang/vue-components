/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 面积图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-03 18:20:33
 */

import { select } from "d3";
import { merge } from "lodash"
 
 /* <svg :width='options.width' :height='options.height' >
<g>
<path 
  class="js-mh-chart-bg" fill="none" stroke="#7783a6" 
  stroke-width="13px" 
  d="M 6.5,150 A 137 137 0 0 1 293.5,150" 
  stroke-linecap="round"></path>

  <path class="mh-chart-process" fill="none" stroke="#a5e436" 
    stroke-dasharray= 509
    stroke-width="13px" d="M 6.5,150 A 137 137 0 0 1 293.5,150" 
    stroke-linecap="round" style="stroke-dashoffset: 416.314px;"></path>
</g>
</svg> */ 

export default {
  template: `<div></div>`,
  data() {
    return {
      svg: null,
      group: null,
      // 默认配置项
      defaultSetting: {
        width: 300,
        height: 300,
      },
    }
  },
  props: {
    sourceData: Object,
    option: Object, // 配置项
  },
  mounted() {
    this.options = merge({}, this.defaultSetting, this.option)
    this.initSvg()
  },
  methods: {

    initSvg() {
      const { width, height } = this.options
      this.svg = select(this.$el)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      
      this.setDataBgAttribute()
      this.setDataAttribute()
    },

    /**
     * @description 背景属性设置
     */
    setDataBgAttribute() {
      this.svg.append('g')
        .append('path')
        .attr('class', 'js-mh-chart-bg')
        .attr('fill', 'none')
        .attr('stroke', '#7783a6')
        .attr('stroke-width', '13px')
        .attr('d', 'M 6.5,150 A 137 137 0 0 1 293.5,150')
        .attr('stroke-linecap', 'round')
    },

    /**
     * @description 背景属性设置
     */
    setDataAttribute() {
      this.svg.append('g')
        .append('path')
        .attr('class', 'mh-chart-process')
        .attr('fill', 'none')
        .attr('stroke', '#a5e436')
        .attr('stroke-width', '13px')
        .attr('stroke-dashoffset', '416.314px')
        .attr('d', 'M 6.5,150 A 137 137 0 0 1 293.5,150')
        .attr('stroke-linecap', 'round')
        .attr('opction', 0)
        .attr('stroke-dasharray', 433.2)
        .transition()
        .duration(2000)
        .attr('stroke-dasharray', 800)
        .attr('opction', 1)
    },

		/*
		* 初始化图表 
		*/
    initChart() {
      
    },

  },
	/*
	 * 监听参数变化  
	 */
  watch: {
    'sourceData': 'initChart'
  }
}


