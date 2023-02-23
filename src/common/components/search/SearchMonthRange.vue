<template>
    <div class="search-date">
        <el-date-picker  v-model="date"  type="monthrange" @change="changeDate"  unlink-panels  range-separator="To" 
         start-placeholder="开始月份"   end-placeholder="结束月份" :shortcuts="shortcuts"   />
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
    text: '本月',
    value: [new Date(), new Date()],
  },
  {
    text: '本年',
    value: () => {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 0)
      return [start, end]
    },
  },
  {
    text: '最近6个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
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


