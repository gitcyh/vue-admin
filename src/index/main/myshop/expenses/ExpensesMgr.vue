<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="图表" name="chart">
            <RingPieChart :options="options"></RingPieChart>
        </el-tab-pane>
        <el-tab-pane label="费用支出明细表" name="expenses">
            <ExpensesList></ExpensesList>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script setup>
import { ref, reactive,onMounted } from 'vue'
import ExpensesList from './ExpensesList.vue';
import RingPieChart from '../../../../common/components/echarts/RingPieChart.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';

const activeName = ref("chart")
const options = reactive(
    {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: []
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
            options.series[0].data = res.data.data.data.map(item =>{
                return {
                    value:item.money,
                    name:item.category,
                }
            })
        }
    })
}



</script>


<style scoped></style>


