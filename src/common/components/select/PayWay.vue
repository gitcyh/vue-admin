<template>
    <el-form-item label="付款方式" prop="payway">
        <el-select v-model="payway" placeholder="请选择付款方式" clearable style="width: 100%" @change="changePayway">
            <el-option v-for="item in options.payOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>

import options from '../../data/options';

defineProps({
    payway:String,
    changePayway:Function
})

</script>
  
<style scoped>

</style>


