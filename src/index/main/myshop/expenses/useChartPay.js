import request from '../../../../request/request'
import api from '../../../../request/api'
import { reactive, onMounted } from 'vue'
import dateUtil from '../../../../common/util/dateUtil'

export default function () {
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

    return options;
}