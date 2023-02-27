<template>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[50, 100, 200, 300,400,500]" :total="total"
        small background layout="total, sizes, prev, pager, next, jumper" 
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script  setup>

import { ref } from 'vue'


const props = defineProps({
    total:Number,
    getData:Function,
})
const currentPage = ref(1)
const pageSize = ref(100)

//改变每页多少条数据
const handleSizeChange = (val) => {
    props.getData(currentPage.value,pageSize);
}
//改变当前是第几页的操作
const handleCurrentChange = (val) => {
    props.getData(currentPage.value,pageSize.value);
}
</script>
  
<style scoped>

</style>
  