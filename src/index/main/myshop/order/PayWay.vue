<template>
    <el-form-item label="付款方式" prop="payway">
        <el-select v-model="payway" placeholder="请选择付款方式" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
defineProps({
    payway:String
})

const options = [
    {
        value: '0',
        label: '微信支付',
    },
    {
        value: '1',
        label: '支付宝',
    },
    {
        value: '2',
        label: '水票',
    },
    {
        value: '3',
        label: '月结',
    },
    {
        value: '4',
        label: '现金',
    },
    {
        value: '5',
        label: '其他',
    },
]

</script>
  
<style scoped>

</style>


