<template>
    <el-form-item label="押金状态" prop="brand" required>
        <el-select v-model="depositState" placeholder="请选择押金状态" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
defineProps({
    depositState:String
})


const options = [
    {
        value: '-1',
        label: '已退',
    },
    {
        value: '0',
        label: '未押',
    },
    {
        value: '1',
        label: '已押',
    },
]

</script>
  
<style scoped>

</style>


