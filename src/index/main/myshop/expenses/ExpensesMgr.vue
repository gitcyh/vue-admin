<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="图表" name="chart">
            <PieChart :options="options"></PieChart>
        </el-tab-pane>
        <el-tab-pane label="费用支出明细表" name="expenses">
            <ExpensesList></ExpensesList>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script setup>
import { ref} from 'vue'
import ExpensesList from './ExpensesList.vue';
import PieChart from '../../../../common/components/echarts/PieChart.vue';
import useChartPay from './useChartPay';

const activeName = ref("chart")
const options = useChartPay();



</script>


<style scoped></style>


