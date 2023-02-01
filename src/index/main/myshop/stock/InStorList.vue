<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入商品属性" />&nbsp;
            <el-date-picker v-model="date" type="date"  label="请选择日期"  placeholder="请选择日期" clearable />
        </div>
        <div class="search-item">
            <InStorAdd></InStorAdd>
        </div>
    </div>
    <el-table :data="filterTableData" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="入库日期" prop="date" sortable />
        <el-table-column label="商品名称" prop="name" />
        <el-table-column label="品牌" prop="brand" />
        <el-table-column label="规格" prop="specs" />
        <el-table-column label="单价" prop="price" sortable />
        <el-table-column label="进货数量" prop="num" sortable />
        <el-table-column label="回桶数量" prop="bucket" />
        <el-table-column label="数量" prop="num" sortable />
        <el-table-column label="金额" prop="money" sortable />
        <el-table-column align="center" fixed="right" label="操作" width="160">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" size="small" type="success"
                        @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>

    <InStorEdit :data="data" ref="editChild"></InStorEdit>
    <InStorView :data="data" ref="viewChild"></InStorView>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Edit, View, Search } from "@element-plus/icons-vue";
import Operation from '../../../../common/util/operation';
import InStorAdd from './InStorAdd.vue';
import InStorEdit from './InStorEdit.vue';
import InStorView from './InStorView.vue'


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
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        price: '15',
        num: '20',
        bucket:20,
        money: '300',
        remark: '无',
    },
    {
        date: '2016-05-03',
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        price: '15',
        num: '20',
        bucket:20,
        money: '300',
        remark: '无',
    },
    {
        date: '2016-05-03',
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        price: '15',
        num: '20',
        bucket:20,
        money: '300',
        remark: '无',
    },
    {
        date: '2016-05-03',
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        price: '15',
        num: '20',
        bucket:20,
        money: '300',
        remark: '无',
    },
    {
        date: '2016-05-03',
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        price: '15',
        num: '20',
        bucket:20,
        money: '300',
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


