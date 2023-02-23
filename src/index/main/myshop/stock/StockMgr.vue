<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="库存图表" name="stockChart">
      <div style="display: flex;">
        <MultiBarChart :options="moptions"></MultiBarChart>
        <BarChartVue :options="options"></BarChartVue>
      </div>
    </el-tab-pane>
    <el-tab-pane label="进货明细表" name="instock">
      <InStockListVue></InStockListVue>
    </el-tab-pane>
    <el-tab-pane label="库存明细表" name="stock">
      <StockListVue></StockListVue>
    </el-tab-pane>
  </el-tabs>
</template>
  
<script setup>
import { ref, onMounted, reactive } from 'vue'
import StockListVue from './StockList.vue';
import InStockListVue from './InStorList.vue';
import BarChartVue from '../../../../common/components/echarts/BarChart.vue';
import MultiBarChart from '../../../../common/components/echarts/MultiBarChart.vue';
import useStock from './useStock';
import request from '../../../../request/request';
import api from '../../../../request/api';

const activeName = ref("stockChart")
const options = reactive(
  {
    title: {
      text: '库存剩余表'
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
        name: '余量',
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

const labelOption = {
  show: true,
  position: "insideBottom",
  distance: "40",
  align: "left",
  verticalAlign: "middle",
  rotate: 45,
  formatter: '{c}  {name|{a}}',
  fontSize: 20,
  rich: {
    name: {}
  }
};
const moptions = reactive(
  {
    title: {
      text: '进货明细表'
    },
    tooltip: {},
    legend: {
      data: []
    },
    toolbox: {
      show: true,
      orient: 'horizontal',
      left: 'right',
      top: 'bottom',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: []
  }
)

const getQuantity = function () {
  useStock.getStockQuantity().then(res => {
    if (res.data.code === 200) {
      let data = res.data.data.data;
      data.forEach(item => {
        options.xAxis.data.push(item.goodsName);
        options.series[0].data.push(item.allowance);
      });
    }
  })
}

const getStockList = function () {
  request.post(api.getInstockList, {
    shopId: localStorage.getItem("shopId")
  }).then(res => {
    if (res.data.code === 200) {
      let data = res.data.data.data;
      let month = [...new Set(data.map(item => item.instockTime))];//获取当前年度不重复的月份
      let goodsName = [...new Set(data.map(item => item.goodsName))];//获取不重复的商品名称
      moptions.xAxis[0].data = month;
      moptions.legend.data = goodsName;
      goodsName.forEach(name => {
        moptions.series.push(
          {
            name: name,
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: getseriesData(data,name,month)
          },
        )
      })
    }
  })
}

const getseriesData = function(data,name,month){
  let filters = data.filter(item => item.goodsName === name);
  return month.map(item =>{
    let find = filters.find(f => f.instockTime === item);
    if(find){
      return find.allwance
    }else{
      return null
    }
  })
}

onMounted(() => {
  getQuantity();
  getStockList();
})
</script>
  

<style scoped></style>


