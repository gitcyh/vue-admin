<template>
    <div id="mbarchart" ref="chartDom">

    </div>
</template>



<script setup>
import { onMounted, ref, watch, defineProps } from 'vue';
import * as echarts from 'echarts/core';
import { ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';


echarts.use([
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

const chartDom = ref(null)
const myChart = ref(null);
const props = defineProps({
    options: {
        type: Object,
        default: {},
        required: true
    },
    width: Number,
    height: Number,
})


const getWidth = function () {
    return chartDom.value.clientWidth;
}

const getHeight = function () {
    return chartDom.value.clientHeight;
}
const resizeHandler = () => {
    myChart.value.resize({
        width: getWidth(),
        height: getHeight(),
    })
}

onMounted(() => {
    myChart.value = echarts.init(chartDom.value, null, {
        width: props.width || getWidth(),
        height: props.height || getHeight()
    })
    myChart.value.setOption(props.options, true)
    window.addEventListener('resize', resizeHandler)
})

watch(() => props.options, (newOptions) => {
    myChart.value.setOption(newOptions)
}, {
    deep: true
})


</script>


<style scoped>
#mbarchart {
    width: 100%;
    height: 100%;
}
</style>