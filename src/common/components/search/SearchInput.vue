<template>
    <div class="search-content">
        <div class="search-text">搜 索:</div>
        <el-input class="search-input" :prefix-icon="Search" v-model="search" @input="inputChange" clearable placeholder="请输入关键字" />
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from "vue";
import { Search } from "@element-plus/icons-vue";

const props = defineProps({
    search:String
})

const emits = defineEmits(['update:modelValue'])

const inputChange = function(value){
    emits('update:modelValue',value);
}

</script>
  

<style scoped>
.search-content {
    display: flex;
}

.search-text {
    width: 50px;
    height: 30px;
    display: flex;
    justify-content: left;
    align-items: center;
    color: rgba(0, 0, 0,1);
}

.search-input {
    width: 300px;
    margin-right: 10px;
}
</style>


