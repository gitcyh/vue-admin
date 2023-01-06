<template>
    <el-form-item label="品牌名称" prop="brand">
        <el-select v-model="brand" placeholder="请选择品牌名称" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
defineProps({
    brand:String
})


const options = [
    {
        value: '0',
        label: '农夫山泉',
    },
    {
        value: '1',
        label: '王老吉',
    },
    {
        value: '2',
        label: '怡宝',
    },
    {
        value: '3',
        label: '景甜',
    },
]

</script>
  
<style scoped>

</style>


