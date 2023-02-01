<template>
    <el-form-item label="结算方式" prop="brand">
        <el-select v-model="brand" placeholder="请选择结算方式" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
defineProps({
    settlement:String
})


const options = [
    {
        value: '0',
        label: '水票',
    },
    {
        value: '1',
        label: '月结',
    },
    {
        value: '2',
        label: '及时支付',
    },
    {
        value: '3',
        label: '其他',
    },
]

</script>
  
<style scoped>

</style>


