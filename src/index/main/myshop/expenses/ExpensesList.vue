<template>
    <div class="search-header">
        <div class="search-item">
            <el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入费用名称" />&nbsp;
            <ExpensesCat></ExpensesCat>&nbsp;
            <el-date-picker v-model="date" type="date"  label="请选择日期"  placeholder="请选择日期" clearable />
        </div>
        <div class="search-item">
            <ExpensesAdd></ExpensesAdd>
        </div>
    </div>
    <el-table :data="filterTableData" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="date" sortable  width="120"/>
        <el-table-column label="费用名称" prop="name" width="200"/>
        <el-table-column label="费用类别" prop="category" width="120"/>
        <el-table-column label="费用描述" prop="description" width="200" />
        <el-table-column label="金额" prop="amount" sortable width="120"/>
        <el-table-column label="备注" prop="remark" />
        <el-table-column align="center" fixed="right" label="操作" width="90">
            <template #default="scope">
                <el-button :icon="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <ExpensesEdit :data="data" ref="editChild"></ExpensesEdit>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Edit, View, Search } from "@element-plus/icons-vue";
import Operation from '../../../../common/util/operation';
import ExpensesAdd from './ExpensesAdd.vue';
import ExpensesEdit from './ExpensesEdit.vue';
import ExpensesCat from './ExpensesCat.vue'


const search = ref('')
const editChild = ref(null);
const viewChild = ref(null);
const date = ref(new Date())

const filterTableData = computed(() =>
    tableData.filter(
        (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const data = ref('');

const handleEdit = (index, row) => {
    editChild.value.visible = true;
    data.value = row;
}

const handleView = (index, row) => {
    viewChild.value.visible = true;
    data.value = row;
}


const tableData = [
    {
        date: '2016-05-03',
        name: '买菜',
        category: '食品支出',
        description: '费用描述',
        amount: 200,
        remark: '无',
    },
    {
        date: '2016-05-03',
        name: '买菜',
        category: '食品支出',
        description: '费用描述',
        amount: 200,
        remark: '无',
    },
    {
        date: '2016-05-03',
        name: '买菜',
        category: '食品支出',
        description: '费用描述',
        amount: 200,
        remark: '无',
    },
    {
        date: '2016-05-03',
        name: '买菜',
        category: '食品支出',
        description: '费用描述',
        amount: 200,
        remark: '无',
    },
    {
        date: '2016-05-03',
        name: '买菜',
        category: '食品支出',
        description: '费用描述',
        amount: 200,
        remark: '无',
    },
]



</script>
  

<style scoped>
.search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    margin: 2px;
}

.search-item {
    display: flex;
    align-items: center;
}

.search-item label {
    width: 50px;
    display: inline-block;
    color: rgb(12, 138, 241);
    padding-left: 4px;
}

.search-header .el-input {
    width: 300px;
    height: 30px;
}
</style>


