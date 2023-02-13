<template>
    <el-form-item label="结算方式" prop="settlement">
        <el-select style="width:100%" v-model="settlement" placeholder="请选择结算方式" clearable @change="changeSettlement">
            <el-option v-for="item in useCustomer.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
import useCustomer from './useCustomer';

defineProps({
    settlement:Number,
    changeSettlement:Function
})



</script>
  
<style scoped>

</style>


