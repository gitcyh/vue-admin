<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入订单信息" />&nbsp;
            <el-date-picker v-model="data.date" type="date"  label="请选择日期"  placeholder="请选择日期" clearable />
        </div>
        <OrderAddVue></OrderAddVue>
    </div>
    <div style="">
        <el-table :data="filterTableData" border  style="width: 100%;" max-height="1000px">
            <el-table-column label="序号" type="index" width="60" />
            <el-table-column label="日期" prop="date" />
            <el-table-column label="客户名称" prop="name" />
            <el-table-column label="地址" prop="address" min-width="200"  />
            <el-table-column label="手机号" prop="phone" />
            <el-table-column label="商品名称" prop="goodsName" />
            <el-table-column label="规格" prop="specs" />
            <el-table-column label="价格" prop="price" width="60" />
            <el-table-column label="数量" prop="num" width="60"/>
            <el-table-column label="付款方式" prop="payway" sortable />
            <el-table-column label="配送状态" prop="sendState" sortable />
            <el-table-column label="配送员" prop="sender" sortable />
            <el-table-column label="备注" prop="remark" min-width="180"  />
            <el-table-column align="center" fixed="right"  label="操作" width="280">
                <template #default="scope">
                    <el-button-group>
                        <el-button color="#626aef" :icon="CopyDocument" type="success" size="small" @click="copy(scope.$index, scope.row)">复制</el-button>
                        <el-button :icon="View" type="success" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                        <el-button :icon="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button :icon="Delete" type="danger" size="small"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
    <OrderEditVue ref="editChild" :data="data"></OrderEditVue>
    <OrderViewVue ref="viewChild" :data="data"></OrderViewVue>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Delete,  Edit,View,Search,CopyDocument} from "@element-plus/icons-vue";
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


const copy = (index, row) => {
    data.value = row;
    editChild.value.visible = true;
}

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
.search-item .el-input{
    width: 300px;
    height: 30px;
}

</style>


