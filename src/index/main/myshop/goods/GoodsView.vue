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
                       <el-input :value="data.name" readonly />
                    </el-form-item>
                    <el-form-item label="品牌" prop="brand">
                        <el-input type="text" :value="data.brand" readonly />
                    </el-form-item>
                    <el-form-item label="规格" prop="specs">
                        <el-input type="text" :value="data.specs" readonly />
                    </el-form-item>
                    <el-form-item label="成本价" prop="price">
                        <el-input :value="data.costPrice" readonly />
                    </el-form-item>
                    <el-form-item label="配送价" prop="price">
                        <el-input :value="data.deliveryPrice" readonly />
                    </el-form-item>
                    <el-form-item label="自提价" prop="price">
                        <el-input :value="data.selfPrice" readonly />
                    </el-form-item>
                    <el-form-item label="水票价" prop="price">
                        <el-input :value="data.waterPrice" readonly />
                    </el-form-item>
                    <el-form-item label="月结价" prop="price">
                        <el-input :value="data.MonthlyPrice" readonly />
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                        <el-input type="text" :value="data.state" readonly />
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


