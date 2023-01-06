<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input v-model="search" size="small" placeholder="请输入订单信息" />&nbsp;
            <el-date-picker v-model="data.date" type="date"  label="请选择日期"  placeholder="请选择日期" clearable />
        </div>
        <div class="search-item">
            <OrderAddVue></OrderAddVue>
        </div>
    </div>
    
    <el-table :data="filterTableData" border  style="width: 100%;">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="date" sortable width="140" />
        <el-table-column label="客户名称" prop="name" sortable  />
        <el-table-column label="地址" prop="address" sortable width="300"  />
        <el-table-column label="手机号" prop="phone" sortable  width="120" />
        <el-table-column label="商品名称" prop="goodsName" sortable width="120" />
        <el-table-column label="规格" prop="specs" sortable  width="100"  />
        <el-table-column label="价格" prop="price" sortable  width="80"/>
        <el-table-column label="数量" prop="num" sortable width="80"/>
        <el-table-column label="付款方式" prop="payway" sortable width="120"/>
        <el-table-column label="配送状态" prop="sendState" sortable width="120"/>
        <el-table-column label="配送员" prop="sender" sortable width="120"/>
        <el-table-column label="备注" prop="remark" sortable  />
        <el-table-column align="right" fixed="right"  label="操作" width="220">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" type="success" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <OrderEditVue ref="editChild" :data="data"></OrderEditVue>
    <OrderViewVue ref="viewChild" :data="data"></OrderViewVue>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Delete,  Edit,View} from "@element-plus/icons-vue";
import OrderAddVue from './OrderAdd.vue';
import OrderEditVue from './OrderEdit.vue';
import OrderViewVue from './OrderView.vue';
import Operation from '../../../../common/util/operation';


const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

const editChild = ref('');
const viewChild = ref('');
const data = ref('');


const handleEdit = (index, row) => {
    data.value = row;
    editChild.value.visible = true;
}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}

const handleDelete = (index, row) => {
    Operation.handleDelete(function(){
        console.log(index, row);
    })
}


const tableData = [
    {
        date:'2023-1-1 10:59',
        name: '陈先生',
        address: '新围仔几巷几号',
        phone: '13712345678',
        goodsName:'农夫山泉',
        specs:"18.9L/桶",
        price:26,
        num:2,
        payway:'微信支付',
        sendState:'0',
        sender:'邓安义',
        remark:'',
    },
    {
        date:'2023-1-1 10:59',
        name: '陈先生',
        address: '新围仔几巷几号',
        phone: '13712345678',
        goodsName:'农夫山泉',
        specs:"18.9L/桶",
        price:26,
        num:2,
        payway:'微信支付',
        sendState:'0',
        sender:'邓安义',
        remark:'',
    },
    {
        date:'2023-1-1 10:59',
        name: '陈先生',
        address: '新围仔几巷几号',
        phone: '13712345678',
        goodsName:'农夫山泉',
        specs:"18.9L/桶",
        price:26,
        num:2,
        payway:'微信支付',
        sendState:'0',
        sender:'邓安义',
        remark:'',
    },
    {
        date:'2023-1-1 10:59',
        name: '陈先生',
        address: '新围仔几巷几号',
        phone: '13712345678',
        goodsName:'农夫山泉',
        specs:"18.9L/桶",
        price:26,
        num:2,
        payway:'微信支付',
        sendState:'0',
        sender:'邓安义',
        remark:'',
    },
]
</script>
  

<style scoped>
.search-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    margin: 2px;
}
.search-item label{
    width: 50px;
    display: inline-block;
    color: rgb(12, 138, 241);
    padding-left: 4px;
}
.search-header .el-input{
    width: 300px;
    height: 30px;
}
</style>


