<template>
    <el-form-item label="配送状态" prop="sendState">
        <el-select v-model="sendState" placeholder="请选择配送状态" clearable style="width: 100%" @change="inputChange">
            <el-option v-for="item in options.sendOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
import { defineProps,defineEmits } from 'vue';
import options from '../../data/options';

defineProps({
    sendState:Number,
})

const emits = defineEmits(['update:sendState'])

const inputChange = function (value) {
    emits('update:sendState', value);
}

</script>
  
<style scoped>

</style>


