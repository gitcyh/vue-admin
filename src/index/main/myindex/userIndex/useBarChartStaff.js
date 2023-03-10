import { onMounted, reactive } from "vue";
import api from '../../../../request/api';
import request from '../../../../request/request';
import dateUtil from '../../../../common/util/dateUtil';

export default function () {
    const options = reactive(
        {
            title: {
                text: '今日排名',
                subtext: '员工送水量排名',
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
                    name: '数量',
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

    const getNumByStaff = function () {
        request.post(api.getNumByStaff, {
            shopId: localStorage.getItem("shopId"),
            type: "date",
            date: dateUtil.getYMD(new Date()),
        }).then(res => {
            if (res.data.code === 200) {
                let data = res.data.data.data;
                data.forEach(item => {
                    options.yAxis.data.push(item.name);
                    options.series[0].data.push(item.sumNum);
                });
            }
        })
    }


    onMounted(() => {
        getNumByStaff();
    })

    return options;


}



