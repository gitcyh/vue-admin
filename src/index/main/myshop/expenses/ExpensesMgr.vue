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
import { ref, reactive, onMounted } from 'vue'
import ExpensesList from './ExpensesList.vue';
import PieChart from '../../../../common/components/echarts/PieChart.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import dateUtil from '../../../../common/util/dateUtil';

const activeName = ref("chart")
const options = reactive(
    {
        title: {
            text: '支出统计表',
            subtext: dateUtil.getYM(new Date()),
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '支出类别',
                type: 'pie',
                radius: '50%',
                data: [],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
)

onMounted(() => {
    getPayoutChart();
})

const getPayoutChart = function () {
    request.post(api.getPayoutChart, {
        shopId: localStorage.getItem("shopId")
    }).then(res => {
        if (res.data.code === 200) {
            options.series[0].data = res.data.data.data.map(item => {
                return {
                    value: item.money,
                    name: item.category,
                }
            })
        }
    })
}



</script>


<style scoped></style>


