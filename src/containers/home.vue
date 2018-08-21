/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:31:55 
 * @Description: 首页入口组件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-21 22:39:25
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
      <div class="wave-chart">
        <WaveCharts :selector="'.wave-chart'" />
      </div>
      <div class="count-chart">
        <CountChart :selector="'.count-chart'" />
      </div>
      
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>  
</template>

<script>
  import chartData from '@/../static/json/charts.json'
  import { WaveCharts, CountChart } from '@/charts/index.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        chartData: chartData,
      };
    },
    components: {
      WaveCharts,
      CountChart
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





