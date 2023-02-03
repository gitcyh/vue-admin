<template>
    <div id="barchart">

    </div>
</template>



<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('barchart'));
    // 绘制图表
    myChart.setOption({
        title: {
            text: '库存剩余表'
        },
        tooltip: {},
        xAxis: {
            axisLabel: {
                rotate: '45'
            },
            data: ['农夫山泉', '王老吉', '景田', '伊利', '怡宝', '梧桐山']
        },
        yAxis: {},
        series: [
            {
                name: '余量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
})


</script>


<style scoped>
#barchart {
    width: 600px;
    height: 600px;
}
</style>