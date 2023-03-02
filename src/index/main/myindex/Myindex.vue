<template>
    <div class="wrap">
        <div class="header">大数据可视化模板</div>
        <div class="content">
            <div class="left">
                <div class="left-top"></div>
                <div class="left-bottom"></div>
            </div>
            <div class="middle">
                <div class="middle-top">
                    <SalesData type="month"></SalesData>
                    <SalesData type="year"></SalesData>
                </div>
                <div class="middle-mid">
                    <BarChart :options="options" :width="600" :height="300"></BarChart>
                </div>
                <div class="middle-bottom">
                    <MapComponent></MapComponent>
                </div>
            </div>
            <div class="right">
                <div class="right-top"></div>
                <div class="right-bottom"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import SalesData from "../../../common/components/echarts/SalesData.vue";
import BarChart from "../../../common/components/echarts/BarChart.vue";
import request from "../../../request/request";
import api from '../../../request/api';
import MapComponent from "../../../common/components/map/MapComponent.vue";
import dateUtil from "../../../common/util/dateUtil";



const options = reactive(
    {
        title: {
            text: '销售统计表'
        },
        tooltip: {},
        xAxis: {
            axisLabel: {
                rotate: '45'
            },
            data: []
        },
        yAxis: {},
        series: [
            {
                name: '金额',
                type: 'bar',
                label: {
                    show: true,
                    fontSize: 18,
                    position: 'inside'
                },
                data: []
            }
        ]
    }
)

const getDataYm = function () {
    request.post(api.sysGetDataYM, {
        shopId: localStorage.getItem("shopId"),
        type: "month",
        date: dateUtil.getYM(new Date()),
    }).then(res => {
        if (res.data.code === 200) {
            let data = res.data.data.data;
            data.forEach(item => {
                options.xAxis.data.push(item.day);
                options.series[0].data.push(item.money);
            });
        }
    })
}

onMounted(() => {
    getDataYm();
})

</script>

<style scoped>
.wrap {
    display: flex;
    height: calc(100vh - 80px);
    flex-direction: column;
    background-color: rgba(2, 70, 131, 1);
}

.header {
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
}

.content {
    height: 92%;
    display: flex;
    width: 100%;
}

.left {
    width: 25%;
    display: flex;
    flex-direction: column;
}

.left-top {
    border: 1px solid #dcd;
    height: 50%;
}

.left-bottom {
    border: 1px solid rgb(214, 23, 214);
    height: 50%;
}

.middle {
    width: 50%;
    display: flex;
    flex-direction: column;
}

.middle-top {
    display: flex;
    justify-content: space-between;
    height: 10%;
    border: 1px solid red;
}

.middle-mid {
    height: 40%;
    border: 1px solid #dcd;
}

.middle-bottom {
    height: 50%;
}

.right {
    width: 25%;
}

.right-top {
    border: 1px solid #dcd;
    height: 50%;
}

.right-bottom {
    border: 1px solid rgb(214, 23, 214);
    height: 50%;
}</style>


