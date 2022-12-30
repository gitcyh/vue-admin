<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="查看商品">
           <template #header="{ close, titleId, titleClass }">
               <div class="my-header">
                   <h6 :id="titleId" :class="titleClass">查看商品</h6>
                   <el-button @click="close" :icon="CloseBold" circle />
               </div>
           </template>
           <div>
               <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm">
                   <el-form-item label="商品名称" prop="name">
                       <el-input v-model="data.name" readonly />
                   </el-form-item>
                   <el-form-item label="品牌" prop="brand">
                       <el-select v-model="data.brand" placeholder="请选择品牌" style="width:100%" readonly>
                           <el-option label="农夫山泉" value="shanghai" />
                           <el-option label="王老吉" value="beijing" />
                       </el-select>
                   </el-form-item>
                   <el-form-item label="价格" prop="price">
                       <el-input v-model.number="data.price" readonly />
                   </el-form-item>
                   <el-form-item label="规格" prop="specs">
                       <el-input type="text" v-model="data.specs" readonly />
                   </el-form-item>
                   <el-form-item>
                       <el-button @click="useGoodsCheck.resetForm(ruleFormRef)">重置</el-button>
                   </el-form-item>
               </el-form>
           </div>
           <template #footer>
               <span class="dialog-footer">
                   <el-button @click="close">关闭</el-button>
               </span>
           </template>
   </el-dialog>
</template>
 
<script setup>
import { ref,reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import UseGoodsCheck from './useGoodsCheck'

let useGoodsCheck = UseGoodsCheck();
const ruleFormRef = ref();

const visible = ref(false);

defineExpose({
    visible
})

const close = function(){
    visible.value = false;
}

const props = defineProps({
   data:Object,
})

const ruleForm = reactive({
   name: '',
   brand: '',
   price: '',
   specs: '',
})

const submitForm = async (formEl) => {
 if (!formEl) return
 await formEl.validate((valid, fields) => {
   if (valid) {
     console.log('submit!')
   } else {
       useGoodsCheck.tips();
   }
 })
}

</script>
 
<style scoped>
.my-header {
   height: 30px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
}
</style>


