<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="库存图表" name="stockChart">
      <div class="chart-content">
        <MultiBarChart :options="moptions"></MultiBarChart>
        <BarChartVue :options="options"></BarChartVue>
      </div>
    </el-tab-pane>
    <el-tab-pane label="进货明细表" name="instock">
      <InStockListVue></InStockListVue>
    </el-tab-pane>
    <el-tab-pane label="库存明细表" name="stock">
      <StockListVue></StockListVue>
    </el-tab-pane>
  </el-tabs>
</template>
  
<script setup>

import { ref } from 'vue'
import StockListVue from './StockList.vue';
import InStockListVue from './InStorList.vue';
import BarChartVue from '../../../../common/components/echarts/BarChart.vue';
import MultiBarChart from '../../../../common/components/echarts/MultiBarChart.vue';
import useChartInstock from './useChartInstock';
import useChartStock from './useChartStock';

const activeName = ref("stockChart")

const options = useChartInstock();

const moptions = useChartStock();






</script>
  

<style scoped>
.chart-content{
  display: flex;
  width: 100%;
  height: calc(100vh - 130px);
}
.chart-content div{
  width: 50%;
}
</style>


