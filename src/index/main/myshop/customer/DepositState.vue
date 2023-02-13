<template>
    <el-form-item label="押金状态" prop="state" required>
        <el-select v-model="state" placeholder="请选择押金状态" @change="changeState" clearable>
            <el-option v-for="item in useCustomer.states" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
import useCustomer from './useCustomer';

defineProps({
    state:String,
    changeState:Function,
})

</script>
  
<style scoped>

</style>


