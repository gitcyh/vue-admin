<template>
    <div class="search-date">
        <el-date-picker v-model="date"   format="YYYY" value-format="YYYY" type="year" @change="changeDate" placeholder="请选择年份" />
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from "vue";


const props = defineProps({
    date: String
})

const emits = defineEmits(['update:modelValue'])

const changeDate = function (value) {
    emits('update:modelValue', value);
}

</script>
  

<style scoped>
.search-date {
    margin-right: 10px;
}

</style>


