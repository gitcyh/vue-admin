<template>
    <el-tabs  type="border-card" v-model="activeName">
        <el-tab-pane label="图表" name="chart">
           图表
        </el-tab-pane>
        <el-tab-pane label="费用支出明细表" name="expenses">
            <ExpensesList></ExpensesList>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script setup>
import { ref } from 'vue'
import ExpensesList from './ExpensesList.vue';

const activeName = ref("expenses")

</script>
  

<style scoped>

</style>


