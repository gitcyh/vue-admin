import { onMounted, reactive } from "vue";
import api from '../../../../request/api';
import request from '../../../../request/request';
import dateUtil from '../../../../common/util/dateUtil';

export default function () {
    const options = reactive(
        {
            title: {
                text: '本月排名',
                subtext: '本月客户消费数量排名',
                textStyle: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff"
                }
            },
            tooltip: {
                // trigger: 'axis',
                // axisPointer: {
                //     type: 'shadow'
                // },
                // formatter: function (params) {
                //     console.log(params)
                //     var tar = params[1];
                //     return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                // }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 1]
            },
            yAxis: {
                type: 'category',
                data: []
            },
            series: [
                {
                    name: '消费数量',
                    label: {
                        show: true,
                        fontSize: 18,
                        position: 'inside'
                    },
                    type: 'bar',
                    data: []
                }
            ]
        }
    )

    const getNumByCustomer = function () {
        request.post(api.getNumByCustomer, {
            shopId: localStorage.getItem("shopId"),
            type: "month",
            date: dateUtil.getYM(new Date()),
        }).then(res => {
            if (res.data.code === 200) {
                let data = res.data.data.data;
                data.forEach(item => {
                    options.yAxis.data.push(item.address);
                    options.series[0].data.push(item.sumNum);
                });
            }
        })
    }


    onMounted(() => {
        getNumByCustomer();
    })

    return options;


}



