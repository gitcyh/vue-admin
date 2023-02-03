<template>
     <el-dialog v-model="visible" :show-close="false" draggable title="编辑商品">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">编辑商品</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useGoodsCheck.rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="data.name" clearable />
                    </el-form-item>
                    <BrandVue :brand="data.brand"></BrandVue>
                    <el-form-item label="规格" prop="specs">
                        <el-input type="text" v-model="data.specs" clearable />
                    </el-form-item>
                    <el-form-item label="成本价" prop="price">
                        <el-input v-model.number="data.costPrice" clearable />
                    </el-form-item>
                    <el-form-item label="配送价" prop="price">
                        <el-input v-model.number="data.deliveryPrice" clearable />
                    </el-form-item>
                    <el-form-item label="自提价" prop="price">
                        <el-input v-model.number="data.selfPrice" clearable />
                    </el-form-item>
                    <el-form-item label="水票价" prop="price">
                        <el-input v-model.number="data.waterPrice" clearable />
                    </el-form-item>
                    <el-form-item label="月结价" prop="price">
                        <el-input v-model.number="data.MonthlyPrice" clearable />
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                        <el-input type="text" v-model="data.state" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="useGoodsCheck.resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
                </span>
            </template>
    </el-dialog>
</template>
  
<script setup>
import { ref,reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import UseGoodsCheck from './useGoodsCheck'
import BrandVue from './Brand.vue'

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
        useGoodsCheck.warning();
    }
  })
}

</script>
  
<style scoped>

</style>


