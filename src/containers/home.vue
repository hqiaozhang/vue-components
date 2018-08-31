/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:31:55 
 * @Description: 首页入口组件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-31 18:16:55
 */

<style lang="scss" scoped>
.home-container {
  padding: 20px;
  float: left;
  width: 100%;
  .item {
    width: 100%;
    float: left;
    margin-bottom: 20px;
    p.h2-title {
      width: 100%;
      font-size: 15px;
      color: #666;
      padding-bottom: 20px;
    }
    .list {
      width: 100%;
      height: 100%;
      li {
        width: 18%;
        height: 180px;
        background: #fff;
        box-shadow: 0 2px 5px #ccc;
        margin-right: 20px;
        float: left;
        padding: 10px;
        cursor: pointer;
        .name {
          float: left;
          width: 100%;
          text-align: center;
        }
        img {
          width: 100%;
          height: 150px;
        }
      }
      
    }
  }
}

.wave-chart {
  width: 300px;
  height: 300px;
}
.count-chart {
   width: 600px;
  height: 300px;
}
</style>

<template>
  <div class="home-container">

    <div class="item" v-for="item in chartData" :key="item.key">
      <p class="h2-title">{{item.typeName}}</p>
      <ul class="list">
        <li @click="dialogVisible = true" v-for="sub in item.child" :key="sub.key">
          <img :src="sub.imgUrl" />
          <p class="name">{{sub.name}}</p>
        </li>
      </ul>
      <div class="iaqi-data">
        <WaveBall :sourceData="waveData" :chartclass="'iaqi-chart'" />
      </div>  
      <div class="count-chart">
        <CountChart :selector="'.count-chart'" />
      </div>
    </div>

  </div>  
</template>

<script>
  import chartData from '@/../static/json/charts.json'
  import { WaveCharts, CountChart } from '@/charts/index.js'
  import { WaveBall } from '@/components/index.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        chartData: chartData,
        waveData: {
          describe: '舒适',
          value: 127,
          chartData: {
            value: [[0.3, 0.3 - 0.05]],
            level: 2
          },
        }
      };
    },
    components: {
      WaveCharts,
      CountChart,
      WaveBall
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>





