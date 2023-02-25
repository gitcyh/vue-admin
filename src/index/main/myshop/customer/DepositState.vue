<template>
    <el-select v-model="state" placeholder="请选择押金状态" @change="inputChange" clearable style="width:100%">
        <el-option v-for="item in useCustomer.states" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>
  
<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';
import useCustomer from './useCustomer';

const props = defineProps({
    state: Number,
})

onMounted(() => {
    console.log(props.state)
})

const emits = defineEmits(['update:modelValue'])

const inputChange = function (value) {
    emits('update:modelValue', value);
}

</script>
  
<style scoped></style>


