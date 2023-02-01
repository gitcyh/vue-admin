<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入店铺信息" />&nbsp;
        </div>
    </div>
    
    <el-table :data="filterTableData" border  style="width: 100%;">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="date" sortable width="140" />
        <el-table-column label="店铺名称" prop="shopname" width="200" />
        <el-table-column label="店铺地址" prop="shop_address"  />
        <el-table-column label="店铺电话" prop="shop_tel"  width="140" />
        <el-table-column label="店主姓名" prop="shopkeeper" width="110" />
        <el-table-column label="店主手机号" prop="telephone"  width="120"  />
        <el-table-column label="公司名称" prop="shopCompany"  width="240"/>
        <el-table-column label="审核状态" prop="apply_status" sortable  width="110"/>
        <el-table-column align="right" fixed="right"  label="操作" width="160">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" type="success" size="small" @click="handleView(scope.$index, scope.row)">详情</el-button>
                    <el-button :icon="Position" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <ShopViewVue ref="viewChild" :data="data"></ShopViewVue>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Position,View,Search} from "@element-plus/icons-vue";
import ShopViewVue from './ShopView.vue';

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



const tableData = [
    {
        date:'2023-1-1 10:59',
        shopname: '农夫山泉新围仔店',
        shop_address: '新围仔4巷5号',
        telephone: '13712345678',
        shop_tel:'0755-1234567',
        shopkeeper:"高先生",
        shopCompany:'农夫山泉风彩店',
        apply_status:'审核成功',
    }
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


