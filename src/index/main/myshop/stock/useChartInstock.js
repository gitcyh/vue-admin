import useStock from './useStock'
import { onMounted, reactive } from 'vue'

export default function () {
  const options = reactive(
    {
      title: {
        text: '库存剩余表'
      },
      tooltip: {},
      legend: {
        data: ['余量']
      },
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

  onMounted(() => {
    getQuantity();
  })

  return options;
}