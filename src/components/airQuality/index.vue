/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-22 13:39:06 
 * @Email: 991034150@qq.com 
 * @Description: 空气质量
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-04 09:07:51
 */

 <style lang="scss" scoped>
 
.air-quality {
  width: 100%;
  padding-left: 40px;
  margin-top: 25px;
  background: #1c4284;
  color: #fff;
  padding: 50px 50px 90px 50px;
  font-size: 14px;
  .chart-wrap {
    position: relative;
    // width: 100%;
    width: 375px;
    left: 50%;
    transform: translateX(-50%);
    height: 145px;
    .level {
      height: 30px;
      position: absolute;
      left: 40%;
      bottom: 10px;
      padding-left: 16px;
      line-height: 30px;
    }
    .leaf {
      height: 30px;
      width: 30px;
      float: left;
      display: inline-block;
    }
    .level1 {
      background: url("./images/leaf/level1.png") no-repeat;
    }
    .level2 {
      background: url("./images/leaf/level2.png") no-repeat;
    }
    .level3 {
      background: url("./images/leaf/level3.png") no-repeat;
    }
    .level4 {
      background: url("./images/leaf/level4.png") no-repeat;
    }
    .level5 {
      background: url("./images/leaf/level5.png") no-repeat;
    }
    .level6 {
      background: url("./images/leaf/level6.png") no-repeat;
    }
    .value {
      position: absolute;
      bottom: 45px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 40px;
      height: 72px;
    }
  }
  .chart-bg {
    background: url("./images/pie-bg.png") no-repeat;
    width: 246px;
    height: 128px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 9px;
    .radius {
      border-radius: 5px;
      width: 9px;
      height: 10px;
      background: #77e750;
      position: absolute;
      bottom: 0;
    }
  }
  .air-quality-chart,
  .scale-value {
    position: absolute !important;
    top: -22px;
    width: 375px;
    height: 310px;
    left: 1px;
  }
  .scale-value {
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform-origin: 170px 50%;
      &::after {
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
      }
      &:nth-child(1) {
        transform: translate(-170px, -50%) rotateZ(0deg);
        &::after {
          content: "0";
          transform: rotate(0deg) translate(21px, -15px);
        }
      }
      &:nth-child(2) {
        transform: translate(-170px, -50%) rotateZ(30deg);
        &::after {
          content: "50";
          transform: rotate(-30deg) translate(10px, 0px);
        }
      }
      &:nth-child(3) {
        transform: translate(-170px, -50%) rotateZ(60deg);
        &::after {
          content: "100";
          transform: rotate(-60deg) translate(-3px, 5px);
        }
      }
      &:nth-child(4) {
        transform: translate(-170px, -50%) rotateZ(90deg);
        &::after {
          content: "150";
          transform: rotate(-90deg) translate(12px, 11px);
        }
      }
      &:nth-child(5) {
        transform: translate(-170px, -50%) rotateZ(120deg);
        &::after {
          content: "200";
          transform: rotate(-120deg) translate(18px, 14px);
        }
      }
      &:nth-child(6) {
        transform: translate(-170px, -50%) rotateZ(150deg);
        &::after {
          content: "300";
          transform: rotate(-150deg) translate(15px, 23px);
        }
      }
      &:nth-child(7) {
        transform: translate(-170px, -50%) rotateZ(180deg);
        &::after {
          content: "500";
          transform: rotate(-180deg) translate(3px, 6px);
        }
      }
    }
  }
  .tooltip,
  .suggest {
    float: left;
    width: 100%;
    text-align: center;
    font-size: 20px;
    padding: 15px 0;
    color: #fff;
  }
  .suggest {
    padding: 0;
    i {
      width: 11px;
      height: 24px;
      display: inline-block;
      padding-right: 25px;
    }
    // 减少出行
    i.jscx {
      background: url("./images/cx.png") no-repeat;
    }
    // 开新风或净化器
    i.jh {
      background: url("./images/jh.png") no-repeat;
      width: 15px;
      height: 20px;
    }
    // 正常出行
    i.zc {
      background: url("./images/zc.png") no-repeat;
      width: 23px;
    }
    // 口罩
    i.kz {
      background: url("./images/kz.png") no-repeat;
      width: 24px;
      height: 21px;
    }
    // 雨伞
    i.ys {
      background: url("./images/ys.png") no-repeat;
      width: 24px;
      height: 22px;
    }
    // 开窗
    i.kc {
      background: url("./images/kc.png") no-repeat;
      width: 20px;
      height: 20px;
    }
  }
  /*旋转动画*/
  @keyframes rotate {
    0% {transform : rotate(0deg);}
    50% {transform : rotate(-90deg);}
    100% {transform : rotate(0deg);}
  }
  .leaf  {
    transform-origin:0% 100%;
    animation:rotate 12s infinite linear;
    -webkit-animation:rotate 12s infinite linear; 
  }
}
</style>

 <template>
   <div class="air-quality">
     <div class="chart-wrap">
       <!-- 参数刻度 -->
       <div class="scale-value">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
       </div>
      <!--  -->
      <div class="value"></div>
      <div class="level"><span class="leaf" :class="`level${sourceData.level}`"></span>{{levelText}}</div>
      <div class="chart-bg"><div class="radius" v-if="!!sourceData.aqi"></div></div>
     <div class="air-quality-chart">
       <AirQualityChart :sourceData="aqiData" :selector="'.air-quality-chart'" />
     </div>
 
     </div>
     <div class="tooltip">{{sourceData.advice}}</div>
     <div class="suggest">
       <!-- 建议图标 -->
       <i v-for="item in adviceIcons"
        :key="item"
        :class="item" />
     </div>
   </div>
 </template>

 <script>
import { AirQualityChart } from "@/charts/index.js";
// 数字滚动
import DigitRoll from '@/assets/plugin/digitroll.js'
export default {
  data() {
    return {
      aqiData: {},
      levelText: "", // 等级文字
      adviceIcons: [],
      digits: 0,
    };
  },
  props: {
    sourceData: Object
  },
  components: {
    AirQualityChart,
    DigitRoll 
  },
  mounted() {
    this.setQqiData();
  },
  methods: {
    /**
     * 设置传给chart的数据
     */
    setQqiData() {
      if (_.isEmpty(this.sourceData)) {
        return;
      }
      this.aqiData = {
        value: this.sourceData.aqi,
        level: this.sourceData.level
      };
      this.digits = this.sourceData.aqi
      this.adviceIcon(this.sourceData.level);
      let dRoll = new DigitRoll({
        container:'.air-quality .value',
        height: 72,
      });
      dRoll.roll(this.digits)
      // 是否下雨
      if(!!this.sourceData.rain_advise) {
        this.adviceIcons.push('ys')
      }
    },
    /**
     *  数字滚动
     *  @param    {object}  data 数据
     *  @return   {object}  null
     */
    digitRoll(value) {
      var localRoll = new DigitRoll({
        container: "#num-roll"
      });
      localRoll.roll(value);
    },
    adviceIcon(level) {
      switch (level) {
        case 6: // 严重污染
          this.adviceIcons = ["kz", "jh"]; // 带口罩、开启净化器
          this.levelText = "严重";
          break;
        case 5: // 重度污染
          this.adviceIcons = ["kz", "jh"]; // 带口罩、开启净化器
          this.levelText = "重度";
          break;
        case 4: // 中度污染
          this.adviceIcons = ["kz", "jscx", "jh"]; // 带口罩、减少外出、开启净化器
          this.levelText = "中度";
          break;
        case 3: // 轻度污染
          this.adviceIcons = ["kz", "jscx", "kc", "jh"]; // 带口罩、减少外出、减少开窗、开启净化器
          this.levelText = "轻度";
          break;
        case 2: // 良
          this.adviceIcons = ["zc", "kc"]; // 适宜外出、 适宜开窗
          this.levelText = "良";
          break;
        case 1: // 优
          this.adviceIcons = ["zc", "kc"]; // 适宜外出、 适宜开窗
          this.levelText = "优";
          break;
        default:
          break;
      }
    }
  },
  watch: {
    sourceData: "setQqiData"
  }
};
</script>
 
 
 
