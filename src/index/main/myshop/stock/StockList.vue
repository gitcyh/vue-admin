<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
        </div>
    </div>
    <el-table :data="filterTableData" show-summary :summary-method="getSummaries" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="商品名称" prop="goodsName" />
        <el-table-column label="规格" prop="specs" />
        <el-table-column label="品牌名称" prop="brandName" />
        <el-table-column label="库存余量" prop="allowance" sortable />
    </el-table>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import SearchInputVue from '../../../../common/components/search/SearchInput.vue';
import useStock from './useStock';

const search = ref('')


const tableData = ref([])


const filterTableData = computed(() =>
    tableData.value.filter(
        (data) => !search.value || data.brandName.includes(search.value) || data.goodsName.includes(search.value) || data.specs.includes(search.value)
    )
)

onMounted(() => {
    useStock.getStockQuantity().then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.data;
        }
    })
})

const getSummaries = (param) => {
    const sums = [];
    const sum_num = tableData.value.map(item => item.allowance).reduce((prev, curr) => {
        return prev + curr
    }, 0)
    sums[0] = '合计';
    sums[4] = '总库存：' + sum_num;
    return sums
}


</script>
  

<style scoped></style>


