<template>
    <div class="search-date">
        <el-date-picker  v-model="date"  type="daterange" @change="changeDate"  unlink-panels  range-separator="To" 
         start-placeholder="开始日期"   end-placeholder="结束日期" :shortcuts="shortcuts"   />
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

const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

</script>
  

<style scoped>
.search-date {
    margin-right: 10px;
}

</style>


