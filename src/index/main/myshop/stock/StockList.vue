<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入商品属性" />
        </div>
    </div>
    <el-table :data="filterTableData" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="品牌" prop="brand" />
        <el-table-column label="商品名称" prop="name" />
        <el-table-column label="规格" prop="specs" />
        <el-table-column label="库存余量" prop="allowance" sortable />
    </el-table>

</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Search } from "@element-plus/icons-vue";

const search = ref('')


const filterTableData = computed(() =>
    tableData.filter(
        (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)


const tableData = [
    {
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        allowance: '15',
    },
    {
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        allowance: '15',
    },
    {
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        allowance: '15',
    },
    {
        brand: '农夫山泉',
        name: '农夫山泉纯净水',
        specs: '18L/桶',
        allowance: '15',
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


