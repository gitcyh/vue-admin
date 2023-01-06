<template>
    <el-form-item label="配送状态" prop="sendState">
        <el-select v-model="sendState" placeholder="请选择配送状态" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
defineProps({
    sendState:String
})

const options = [
    {
        value: '0',
        label: '未配送',
    },
    {
        value: '1',
        label: '配送中',
    },
    {
        value: '2',
        label: '已配送',
    },
    {
        value: '3',
        label: '客户自提',
    },
    {
        value: '4',
        label: '其他',
    },
]

</script>
  
<style scoped>

</style>


