import request from '../../../../request/request';
import api from '../../../../request/api';
import { onMounted, reactive } from 'vue'

export default function () {

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
    const options = reactive(
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



    const getStockList = function () {
        request.post(api.getInstockList, {
            shopId: localStorage.getItem("shopId")
        }).then(res => {
            if (res.data.code === 200) {
                let data = res.data.data.data;
                let month = [...new Set(data.map(item => item.instockTime))];//获取当前年度不重复的月份
                let goodsName = [...new Set(data.map(item => item.goodsName))];//获取不重复的商品名称
                options.xAxis[0].data = month;
                options.legend.data = goodsName;
                goodsName.forEach(name => {
                    options.series.push(
                        {
                            name: name,
                            type: 'bar',
                            barGap: 0,
                            label: labelOption,
                            emphasis: {
                                focus: 'series'
                            },
                            data: getseriesData(data, name, month)
                        },
                    )
                })
            }
        })
    }

    onMounted(() => {
        getStockList();
    })

    return options;
}