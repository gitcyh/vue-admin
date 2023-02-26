<template>
    <div id="ringPieChart" ref="chartDom">

    </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);



const chartDom = ref(null)
const myChart = ref(null);
const props = defineProps({
    options: {
        type: Object,
        default: {},
        required: true
    },
})
const resizeHandler = () => {
    myChart.value.resize()
}

onMounted(() => {
    myChart.value = echarts.init(chartDom.value)
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
#ringPieChart {
    width: 600px;
    height: 600px;
}
</style>