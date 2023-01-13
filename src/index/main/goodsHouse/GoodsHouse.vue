<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入商品属性" />
        </div>
        <div class="search-item">
            <GoodsAdd></GoodsAdd>&nbsp;
            <BrandMgrVue></BrandMgrVue>
        </div>
    </div>
    <el-table :data="filterTableData" border  style="width: 100%">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="date" sortable  />
        <el-table-column label="品牌" prop="brand" sortable  />
        <el-table-column label="商品名称" prop="name" sortable  />
        <el-table-column label="规格" prop="specs" sortable  />
        <!-- <el-table-column label="商品描述" prop="description" sortable>
            <template #default="scope">
                <el-button :icon="View" size="small" @click="handleView(scope.$index, scope.row)">详情</el-button>
            </template>
        </el-table-column> -->
        <el-table-column align="right"  label="操作" >
            <template #default="scope">
                <el-button-group>
                     <el-button :icon="View" size="small" type="success" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <GoodsEditVue :data="data" ref="editChild"></GoodsEditVue>
    <GoodsViewVue :data="data" ref="viewChild"></GoodsViewVue>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Delete,  Edit,View,Search} from "@element-plus/icons-vue";
import Operation from '../../../common/util/operation';
import GoodsAdd from './GoodsAdd.vue'
import GoodsEditVue from './GoodsEdit.vue';
import GoodsViewVue from './GoodsView.vue';
import BrandMgrVue from './BrandMgr.vue';

const search = ref('')
const editChild = ref(null);
const viewChild = ref(null);

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

const handleDelete = (index, row) => {
    Operation.handleDelete(function(){
        console.log(index, row);
    })
}

const tableData = [
    {
        date: '2016-05-03',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
    },
    {
        date: '2016-05-02',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
    },
    {
        date: '2016-05-04',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
    },
    {
        date: '2016-05-01',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
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
.search-item{
    display: flex;
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


