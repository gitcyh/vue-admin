<template>
    <div class="search-date">
        <el-date-picker v-model="date"   format="YYYY-MM" value-format="YYYY-MM" type="month" @change="changeDate" placeholder="请选择月份" />
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits,onMounted } from "vue";


const props = defineProps({
   date:String
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


