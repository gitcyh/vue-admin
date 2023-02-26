<template>
    <div class="search-date">
        <el-date-picker v-model="date"    format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="date" @change="changeDate" placeholder="请选择日期" />
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from "vue";


const props = defineProps({
    date: String
})

const emits = defineEmits(['update:date'])

const changeDate = function (value) {
    emits('update:date', value);
}

</script>
  

<style scoped>
.search-date {
    margin-right: 10px;
}


</style>


