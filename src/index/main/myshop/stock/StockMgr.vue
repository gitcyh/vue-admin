<template>
    <el-tabs  type="border-card" v-model="activeName">
        <el-tab-pane label="库存图表" name="stockChart">
          <div style="display: flex;">
            <MultiBarChart></MultiBarChart>
            <BarChartVue></BarChartVue>
          </div>
           
        </el-tab-pane>
        <el-tab-pane label="库存明细表" name="stock">
            <StockListVue></StockListVue>
        </el-tab-pane>
        <el-tab-pane label="进货明细表" name="instock">
            <InStockListVue></InStockListVue>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script setup>
import { ref } from 'vue'
import StockListVue from './StockList.vue';
import InStockListVue from './InStorList.vue';
import BarChartVue from '../../../../common/components/echarts/BarChart.vue';
import MultiBarChart from '../../../../common/components/echarts/MultiBarChart.vue';

const activeName = ref("stock")

</script>
  

<style scoped>

</style>


