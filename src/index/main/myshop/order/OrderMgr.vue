<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
            <SearchDateVue v-model="searchDate"></SearchDateVue>
            <SearchMonthVue  v-model="searchMonth"></SearchMonthVue>
        </div>
        <OrderAddVue></OrderAddVue>
    </div>
    <div style="">
        <el-table show-summary :summary-method="getSummaries" :data="filterTableData" @row-contextmenu="rowContextmenu" :row-style="rowStyle"
         border style="width: 100%;" max-height="80vh">
            <el-table-column align="center" label="序号" type="index" width="60" />
            <el-table-column align="center" label="日期" prop="date" width="120">
                <template #default="scope">
                    {{ scope.row.orderTime.split("T")[0] }}
                </template>
            </el-table-column>
            <el-table-column label="客户名称" prop="customerName" />
            <el-table-column label="地址" prop="address" min-width="200" />
            <el-table-column label="手机号" prop="customerPhone" min-width="120" />
            <el-table-column label="商品名称" prop="goodsName" />
            <el-table-column label="规格" prop="specs" />
            <el-table-column label="价格" prop="price" min-width="55" />
            <el-table-column label="数量" prop="num" min-width="55" />
            <el-table-column label="付款方式" prop="payway" min-width="80">
                <template #default="scope">
                    {{ options.getPayway(scope.row.payway)}}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="sendState" min-width="70" sortable >
                <template #default="scope">
                    {{ options.getSendState(scope.row.sendState)}}
                </template>     
            </el-table-column>
            <el-table-column label="配送员" prop="senderName" sortable />
            <el-table-column label="备注" prop="remark" min-width="180" />
            <el-table-column align="center" fixed="right" label="操作" width="280">
                <template #default="scope">
                    <el-button-group>
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

    <OrderEditVue ref="editChild" :id="id"></OrderEditVue>
    <OrderViewVue ref="viewChild" :data="data"></OrderViewVue>
</template>
  
<script setup>
import { computed, ref, onMounted, watch } from 'vue'
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

const tableData = ref([]);
const search = ref('')
const searchDate = ref(dateUtil.getYMD(new Date()))
const searchMonth = ref(dateUtil.getYM(new Date()))
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) => !search.value || data.customerName.includes(search.value) || data.address.includes(search.value) || data.customerPhone.includes(search.value)
        || data.goodsName.includes(search.value) || data.specs.includes(search.value) || data.senderName.includes(search.value)
    )
)

const editChild = ref('');
const viewChild = ref('');
const data = ref({});
const id = ref('');


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
    editChild.value.visible = true;
}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}

const updateInfo = function(id,style){
    request.post(api.sysUpdateInfo,{
        id:id,
        style:JSON.stringify(style)
    }).then(res =>{
        if(res.data.code !== 200){
            operation.warning();
        }
    })
}

const rowContextmenu = function(row, column, event){
    let style = JSON.parse(row.style);
    style.color = "rgba(0,0,0,1)";
    updateInfo(row.id,style);
    let target = event.target;
    while(target.tagName !== "TR"){
        target = target.parentElement;
    }
    for(let key in style){
        target.style[key] = style[key]
    }
}

const rowStyle = function({row,rowIndex}){
    return JSON.parse(row.style)
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
        })
    })
}

const getOrders = function (type="date",date=searchDate.value) {
    request.post(api.sysGetOrders, {
        shopId: localStorage.getItem("shopId"),
        type:type,
        date:date,
    }).then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.data;
        }else{
            tableData.value = [];
        }
    })
}

watch(searchDate,(newValue,oldValue)=>{
    getOrders("date",newValue);
})

watch(searchMonth,(newValue,oldValue)=>{
    getOrders("month",newValue);
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
.el-table tbody tr:hover>td {
    background-color:none !important
}
</style>


