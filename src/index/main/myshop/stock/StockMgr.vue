<template>
    <el-tabs  type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="库存图表" name="stockChart">
           图表
        </el-tab-pane>
        <el-tab-pane label="库存明细表" name="stock">
            <StockListVue></StockListVue>
        </el-tab-pane>
        <el-tab-pane label="入库明细表" name="instock">
            <InStockListVue></InStockListVue>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script setup>
import { ref } from 'vue'
import StockListVue from './StockList.vue';
import InStockListVue from './InStorList.vue';

const activeName = ref("stock")

</script>
  

<style scoped>

</style>


