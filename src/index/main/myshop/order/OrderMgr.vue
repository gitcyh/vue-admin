<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
            <SearchDateVue v-model:date="searchDate"></SearchDateVue>
            <SearchMonthVue v-model:date="searchMonth"></SearchMonthVue>
        </div>
        <OrderAddVue :getOrders="getOrders"></OrderAddVue>
    </div>
    <div @click="tableClick" class="mytable" style="overflow:auto;">
        <el-table show-summary :summary-method="getSummaries" :data="filterTableData" @row-contextmenu="rowContextmenu"
            :row-style="rowStyle" style="width: 100%;" max-height="80vh" border v-loading="loading">
            <template default="empty">
                <el-empty :image-size="100" description='今日暂无订单哦'></el-empty>
            </template>
            <el-table-column align="center" label="序号" type="index" min-width="50" />
            <el-table-column align="center" label="日期" prop="date" min-width="100">
                <template #default="scope">
                    {{ scope.row.orderTime.split("T")[0] }}
                </template>
            </el-table-column>
            <el-table-column label="客户名称" prop="customerName" min-width="80" />
            <el-table-column label="地址" prop="address" min-width="200" />
            <el-table-column label="手机号" prop="customerPhone" min-width="100" />
            <el-table-column label="商品名称" prop="goodsName" min-width="140" />
            <el-table-column label="规格" prop="specs" min-width="100" />
            <el-table-column label="价格" prop="price" min-width="55" />
            <el-table-column label="数量" prop="num" min-width="55" />
            <el-table-column label="付款方式" prop="payway" min-width="80">
                <template #default="scope">
                    {{ options.getPayway(scope.row.payway) }}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="sendState" min-width="80" sortable>
                <template #default="scope">
                    {{ options.getSendState(scope.row.sendState) }}
                </template>
            </el-table-column>
            <el-table-column label="配送员" prop="senderName" sortable min-width="80" />
            <el-table-column label="备注" prop="remark" min-width="120" />
            <el-table-column align="center" fixed="right" label="操作" width="230">
                <template #default="scope">
                    <el-button-group style="display:flex;flex-wrap: wrap;">
                        <el-button color="#626aef" :icon="CopyDocument" type="success" size="small"
                            @click="copy(scope.$index, scope.row)">复制</el-button>
                        <el-button :icon="View" type="success" size="small"
                            @click="handleView(scope.$index, scope.row)">查看</el-button>
                        <el-button :icon="Edit" type="primary" size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button :icon="Delete" type="danger" size="small"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>

        </el-table>
    </div>
    <StyleVue ref="stylevue" :style="style" :changeStyle="changeStyle"></StyleVue>
    <OrderEditVue :getOrders="getOrders" ref="editChild" :id="id"></OrderEditVue>
    <OrderViewVue ref="viewChild" :data="data"></OrderViewVue>
</template>
  
<script setup>
import { computed, ref, onMounted, watch, provide } from 'vue'
import { Delete, Edit, View, CopyDocument } from "@element-plus/icons-vue";
import OrderAddVue from './OrderAdd.vue';
import OrderEditVue from './OrderEdit.vue';
import OrderViewVue from './OrderView.vue';
import Operation from '../../../../common/util/operation';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import options from '../../../../common/data/options';
import SearchInputVue from '../../../../common/components/search/SearchInput.vue';
import SearchDateVue from '../../../../common/components/search/SearchDate.vue';
import dateUtil from '../../../../common/util/dateUtil';
import SearchMonthVue from '../../../../common/components/search/SearchMonth.vue';
import StyleVue from '../../../../common/components/tool/Style.vue';


const tableData = ref([]);
const search = ref('')
const searchDate = ref(dateUtil.getYMD(new Date()))
const searchMonth = ref('')
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) => !search.value || data.customerName.includes(search.value) || data.address.includes(search.value) || data.customerPhone?.includes(search.value)
            || data.goodsName.includes(search.value) || data.specs.includes(search.value) || data.senderName.includes(search.value)
    )
)
const loading = ref(false);
const editChild = ref('');
const viewChild = ref('');
const data = ref({});
const id = ref('');
const rightId = ref('');// 鼠标右键选择的行
const stylevue = ref();
let target = {};
const style = ref(
    {
        'font-family': '微软雅黑',
        'font-size': "14px",
        'font-weight': 'normal',
        'background-color': 'rgba(255,255,255,1)',
        color: 'rgba(0,0,0,1)',
        'font-style': 'normal',
    },
)
const changeStyle = function (value) {
    style.value = value;
    let row = tableData.value.find(item => item.id === rightId.value);
    row && (row.style = value);
    updateInfo(rightId.value, value)
    while (target.tagName !== "TR") {
        target = target.parentElement;
    }
    for (let key in value) {
        target.style[key] = value[key]
    }
}


const copy = (index, row) => {
    let input = document.createElement("input");
    input.value = `${row.address}:送${row.num}桶${row.goodsName}(${row.specs})`
    input.select();
    input.setSelectionRange(0, 99999); /* 为移动设备设置 */
    navigator.clipboard.writeText(input.value);
    input.remove();
    input = null;
}

const handleEdit = (index, row) => {
    id.value = row.id;
    setTimeout(() => {
        editChild.value.visible = true;
    }, 50)

}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}

const updateInfo = function (id, style) {
    request.post(api.sysUpdateInfo, {
        id: id,
        style: typeof style === 'string' ? style : JSON.stringify(style)
    }).then(res => {
        if (res.data.code !== 200) {
            operation.warning();
        }
    })
}

const rowContextmenu = function (row, column, event) {
    style.value = rowStyle({ row });
    rightId.value = row.id;
    target = event.target;
    stylevue.value.styleShow = true;
    stylevue.value.styleEl.style.left = event.x + "px";
    stylevue.value.styleEl.style.top = event.y + "px";
}

const tableClick = function () {
    stylevue.value.styleShow = false;
}

const rowStyle = function ({ row, rowIndex }) {
    if (row.style) {
        if(typeof row.style === 'object'){
            return row.style;
        }else{
            return JSON.parse(row.style);
        }
    }else{
        return style.value;
    }
}

const handleDelete = (index, row) => {
    Operation.handleDelete(function () {
        request.get(api.sysDeleteOrder, {
            params: {
                id: row.id
            }
        }).then(res => {
            if (res.data.code === 200) {
                operation.success();
            } else {
                operation.warning();
            }
            close();
            getOrders();
        })
    })
}

const getOrders = function (type = "date", date = searchDate.value) {
    loading.value = true;
    request.post(api.sysGetOrders, {
        shopId: localStorage.getItem("shopId"),
        type: type,
        date: date,
    }).then(res => {
        loading.value = false;
        if (res.data.code === 200) {
            tableData.value = res.data.data.data;
        } else {
            tableData.value = [];
            let dom =  document.getElementsByClassName("el-table__empty-text")[0];
            dom && (dom.innerText = "今日暂无订单哦,请添加或查询本月订单");
          
        }
    })
}

provide("refresh",getOrders)

watch(searchDate, (newValue, oldValue) => {
    if (newValue) {
        searchMonth.value = null;
        getOrders("date", newValue);
    }

})

watch(searchMonth, (newValue, oldValue) => {
    if (newValue) {
        searchDate.value = null;
        getOrders("month", newValue);
    }

})

onMounted(() => {
    getOrders();
})

const getSummaries = (param) => {
    const sums = [];
    const sum_num = tableData.value.map(item => item.num).reduce((prev, curr) => {
        return prev + curr
    }, 0)
    const sum_money = tableData.value.map(item => item.num * item.price).reduce((prev, curr) => {
        return prev + curr
    }, 0)
    sums[0] = '合计';
    sums[1] = '总金额：￥' + sum_money;
    sums[2] = '总数：' + sum_num
    return sums
}


</script>
  

<style scoped>
.el-button--small {
    padding: 5px;
}
</style>


