<template>
    <div class="wrap">
        <div class="header"><SalesData type="date"></SalesData></div>
        <div class="content">
            <div class="left">
                <div class="left-top">
                    <BarChart :options="options2"></BarChart>
                </div>
                <div class="left-bottom">
                    <BarChart :options="options3"></BarChart>
                </div>
            </div>
            <div class="middle">
                <div class="middle-top">
                    <SalesData type="month"></SalesData>
                    <SalesData type="year"></SalesData>
                </div>
                <div class="middle-mid">
                    <BarChart :options="options"></BarChart>
                </div>
                <div class="middle-bottom">
                    <MapComponent></MapComponent>
                </div>
            </div>
            <div class="right">
                <div class="right-top"></div>
                <div class="right-bottom">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SalesData from "../../../common/components/echarts/SalesData.vue";
import BarChart from "../../../common/components/echarts/BarChart.vue";
import MapComponent from "../../../common/components/map/MapComponent.vue";
import useBarChart from "./userIndex/useBarChart";
import useBarChartStaff  from "./userIndex/useBarChartStaff";
import useBarChartCustomer from "./userIndex/useBarChartCustomer";


const options = useBarChart();
const options2 = useBarChartStaff();
const options3 = useBarChartCustomer()


</script>

<style scoped>
.wrap {
    display: flex;
    height: calc(100vh - 82px);
    flex-direction: column;
    background-color: rgba(29,43,86,1);
    border: 1px solid #148ca6;
}

.header {
    height: 8%;
    display: flex;
    justify-content: left;
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
    border-top: 1px solid #148ca6;
    border-right: 1px solid #148ca6;
}

.left-top {
    height: 30%;
    border-bottom: 1px solid #148ca6;
}

.left-bottom {
    height: 70%;
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
    border-top: 1px solid #148ca6;
    border-bottom: 1px solid #148ca6;
}

.middle-mid {
    height: 40%;
    border-bottom: 1px solid #148ca6;
}

.middle-bottom {
    height: 50%;
    border: 1px solid #08bee7;
}

.right {
    width: 25%;
    height: 100%;
}

.right-top {
    border-top: 1px solid #148ca6;
    border-left: 1px solid #148ca6;
    height: 50%;
}

.right-bottom {
    height: 50%;
    border-left: 1px solid #148ca6;
    border-top: 1px solid #148ca6;
}</style>


