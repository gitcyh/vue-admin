<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入客户信息" />
        </div>
        <div class="search-item">
            <CustomerAddVue></CustomerAddVue>
        </div>
    </div>
    
    <el-table :data="filterTableData" border  style="width: 100%">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="客户名称" prop="name" />
        <el-table-column label="地址" prop="address" min-width="300"/>
        <el-table-column label="结算方式" prop="settlement" />
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="押金状态" prop="depositState" sortable />
        <el-table-column label="押金管理" width="100">
            <template #default="scope">
                <DepositMgr></DepositMgr>
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" sortable min-width="200" />
        <el-table-column align="right"  label="操作" width="220">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" type="success" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <CustomerEditVue ref="editChild" :data="data"></CustomerEditVue>
    <CustomerViewVue ref="viewChild" :data="data"></CustomerViewVue>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Delete,  Edit,View,Search} from "@element-plus/icons-vue";
import Operation from '../../../../common/util/operation';
import CustomerAddVue from './CustomerAdd.vue';
import CustomerEditVue from './CustomerEdit.vue';
import CustomerViewVue from './CustomerView.vue';
import DepositMgr from './DepositMgr.vue';


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
        name: '陈先生',
        address: '新围仔几巷几号',
        settlement:"水票",
        phone: '13712345678',
        depositState:'已押',
        remark:'',
    },
    {
        name: '陈先生',
        address: '新围仔几巷几号',
        settlement:"月结",
        phone: '13712345678',
        depositState:'已押',
        remark:'',
    },
    {
        name: '陈先生',
        address: '新围仔几巷几号',
        settlement:"及时支付",
        phone: '13712345678',
        depositState:'已押',
        remark:'',
    },
    {
        name: '陈先生',
        address: '新围仔几巷几号',
        settlement:"其他",
        phone: '13712345678',
        depositState:'已押',
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


