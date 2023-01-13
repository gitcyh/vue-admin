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
    <el-table :data="filterTableData" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="date" sortable  width="120"  />
        <el-table-column label="品牌" prop="brand" width="120"  />
        <el-table-column label="商品名称" prop="name"  />
        <el-table-column label="规格" prop="specs" width="100"/>
        <el-table-column label="成本价" prop="costPrice" sortable width="100"/>
        <el-table-column label="配送价" prop="deliveryPrice" sortable width="100" />
        <el-table-column label="自提价" prop="selfPrice" sortable  width="100"/>
        <el-table-column label="水票价" prop="waterPrice" sortable width="100"/>
        <el-table-column label="月结价" prop="MonthlyPrice" sortable width="100"/>
        <el-table-column label="状态" prop="state" sortable width="100"/>
        <el-table-column fixed="right" align="center" label="操作" width="220">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" size="small" type="success" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Top" type="warning" size="small" @click="handleShelf(scope.$index, scope.row)">上架</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <GoodsEditVue :data="data" ref="editChild"></GoodsEditVue>
    <GoodsViewVue :data="data" ref="viewChild"></GoodsViewVue>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Top,  Edit,View,Search} from "@element-plus/icons-vue";
import Operation from '../../../../common/util/operation';
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

const handleShelf = (index, row) => {
    // Operation.handleShelf(function(){
    //     console.log(index, row);
    // })
}

const tableData = [
    {
        date: '2016-05-03',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
        costPrice:'15',
        deliveryPrice:'28',
        selfPrice:'26',
        waterPrice:'25',
        MonthlyPrice:'26',
        state:'1',
    },
    {
        date: '2016-05-02',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
        costPrice:'15',
        deliveryPrice:'28',
        selfPrice:'26',
        waterPrice:'25',
        MonthlyPrice:'26',
        state:'1',
    },
    {
        date: '2016-05-04',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
        costPrice:'15',
        deliveryPrice:'28',
        selfPrice:'26',
        waterPrice:'25',
        MonthlyPrice:'26',
        state:'1',
    },
    {
        date: '2016-05-01',
        brand:'农夫山泉',
        name: '农夫山泉纯净水',
        specs:'18L/桶',
        costPrice:'15',
        deliveryPrice:'28',
        selfPrice:'26',
        waterPrice:'25',
        MonthlyPrice:'26',
        state:'1',
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
    align-items: center;
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


