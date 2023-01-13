<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加商品</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加商品">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加商品</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useGoodsCheck.rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleForm.name" clearable />
                    </el-form-item>
                    <BrandVue :brand="ruleForm.brand"></BrandVue>
                    <el-form-item label="规格" prop="specs">
                        <el-input type="text" v-model="ruleForm.specs" clearable />
                    </el-form-item>
                    <el-form-item label="成本价" prop="price">
                        <el-input v-model.number="ruleForm.costPrice" clearable />
                    </el-form-item>
                    <el-form-item label="配送价" prop="price">
                        <el-input v-model.number="ruleForm.deliveryPrice" clearable />
                    </el-form-item>
                    <el-form-item label="自提价" prop="price">
                        <el-input v-model.number="ruleForm.selfPrice" clearable />
                    </el-form-item>
                    <el-form-item label="水票价" prop="price">
                        <el-input v-model.number="ruleForm.waterPrice" clearable />
                    </el-form-item>
                    <el-form-item label="月结价" prop="price">
                        <el-input v-model.number="ruleForm.MonthlyPrice" clearable />
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                        <el-input type="text" v-model="ruleForm.state" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="useGoodsCheck.resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref,reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import BrandVue from './Brand.vue'
import UseGoodsCheck from './useGoodsCheck'

let useGoodsCheck =  UseGoodsCheck();

const ruleFormRef = ref();
const visible = ref(false);
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
        UseGoodsCheck.tips();
    }
  })
}

</script>
  
<style scoped>
.goods-add  .el-dialog__header {
    height: 30px;
    padding-left: 4px;
    padding-top: 4px;
    padding-right: 10px;
}


</style>


