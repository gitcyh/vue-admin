<template>
    <el-tabs  type="border-card" v-model="activeName">
        <el-tab-pane label="商品分类表" name="goodsCat">
            <GoodsCatHouse />
        </el-tab-pane>
        <el-tab-pane label="费用分类表" name="expenseCat">
            <ExpenseCatHouse />
        </el-tab-pane>
    </el-tabs>
</template>
  
<script setup>
import { ref } from 'vue'
import GoodsCatHouse from './GoodsCatHouse.vue'
import ExpenseCatHouse from './ExpenseCatHouse.vue'

const activeName = ref("goodsCat")

</script>
  

<style scoped>

</style>


