<style lang="scss" scoped>
.wave-ball {
  position: relative;
  // float: left;
  color: #fff;
  margin: 0 auto;
  width: 170px;
  .value {
    position: absolute;
    z-index: 99;
    top: 50%;
    font-size: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
  }
  .describe {
    position: absolute;
    width: 100%;
    bottom: 22px;
    font-size: 20px;
    z-index: 99;
    text-align: center;
  }
  .chart {
    width: 170px;
    height: 170px;
  }
}
</style>

<template>
  <div class="wave-ball">
    <!-- 动态加载 -->
    <div class="value" :class="`${chartclass}-value`"></div>
    <div class="describe">{{sourceData.describe}}</div>
    <div class="chart" :class="chartclass">
      <WaveCharts :selector="`.${chartclass}`"  :sourceData="sourceData.chartData" />
    </div>
  </div>
</template>

<script>
import { WaveCharts } from "@/charts/index.js";
import DigitRoll from '@/assets/plugin/digitroll.js'
export default {
  data() {
    return {
      waveData: {
        value: [[0.3, 0.3 - 0.05]],
        level: 2
      },
      chartclass: 'iaqi-chart'
    };
  },
  components: {
    WaveCharts
  },
  props: {
    // chartclass: String,
    selector: String,
    sourceData: Object
  },
  mounted() {
    let dRoll = new DigitRoll({
      container: `.${this.chartclass}-value`
    });
    dRoll.roll(this.sourceData.value);
  }
};
</script>

