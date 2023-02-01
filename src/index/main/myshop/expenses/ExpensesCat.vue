<template>
    <el-select v-model="category" placeholder="请选择支出类别" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>
  
<script setup>
defineProps({
    category: String
})


const options = [
    {
        value: '0',
        label: '生活缴费',
    },
]

</script>
  
<style scoped>

</style>


