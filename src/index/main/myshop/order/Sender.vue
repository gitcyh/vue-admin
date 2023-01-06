<template>
    <el-form-item label="配送员" prop="sender">
        <el-select v-model="sender" placeholder="请选择配送员" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
defineProps({
    sender:String
})

const options = [
    {
        value: '0',
        label: '邓安义',
    },
    {
        value: '1',
        label: '邓邦康',
    },
    {
        value: '2',
        label: '龚亚军',
    },
    {
        value: '3',
        label: '张亮',
    },
    {
        value: '4',
        label: '客户自提',
    },
]

</script>
  
<style scoped>

</style>


