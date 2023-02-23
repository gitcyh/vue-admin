<template>
    <el-form-item label="配送状态" prop="sendState">
        <el-select v-model="sendState" placeholder="请选择配送状态" clearable style="width: 100%" @change="changeSendState">
            <el-option v-for="item in options.sendOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
import options from '../../data/options';

defineProps({
    sendState:String,
    changeSendState:Function,
})


</script>
  
<style scoped>

</style>


