<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="查看商品" top="5vh">
           <template #header="{ close, titleId, titleClass }">
               <div>
                   <h6 :id="titleId" :class="titleClass">查看商品</h6>
                   <el-button @click="close" :icon="CloseBold" circle />
               </div>
           </template>
           <div>
               <el-form label-width="100px" class="demo-ruleForm">
                   <el-form-item label="日期">
                       <el-input  :value="data.createTime" readonly />
                   </el-form-item>
                   <el-form-item label="商品名称">
                       <el-input  :value="data.goodsName" readonly />
                   </el-form-item>
                   <el-form-item label="品牌名称">
                       <el-input type="text" :value="data.brandName" readonly />
                   </el-form-item>
                   <el-form-item label="规格">
                       <el-input type="text" :value="data.specs" readonly />
                   </el-form-item>
                   <el-form-item label="商品描述">
                       <div style="overflow: auto;height: 500px;width: 100%;" v-html="data.goodsDesc"></div>
                    </el-form-item>
               </el-form>
           </div>
           <template #footer>
               <span class="dialog-footer">
                   <el-button @click="visible = false">关闭</el-button>
               </span>
           </template>
   </el-dialog>
</template>
 
<script setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'

const props = defineProps({
   data:Object,
})

const visible = ref(false);

defineExpose({
    visible
})


</script>
 
<style scoped>
.my-header {
   height: 30px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
}
</style>


