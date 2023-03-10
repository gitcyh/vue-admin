import { onMounted, reactive } from "vue";
import api from '../../../../request/api';
import request from '../../../../request/request';
import dateUtil from '../../../../common/util/dateUtil';

export default function () {
    const options = reactive(
        {
            title: {
                text: '本月每日销售额',
                textStyle: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff"
                }

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
                    name: '金额(元)',
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

    return options;


}



