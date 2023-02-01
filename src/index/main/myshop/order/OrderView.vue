<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="查看订单">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">查看订单</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm"  label-width="100px" class="demo-ruleForm">
                    <el-form-item label="日期" prop="date">
                        <el-input :value="data.date" readonly />
                    </el-form-item>
                    <el-form-item label="客户名称" prop="name">
                        <el-input :value="data.name" readonly />
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input :value="data.address" type="text" readonly />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" :value="data.phone" readonly />
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input :value="data.goodsName"  readonly />
                    </el-form-item>
                    <el-form-item label="规格" prop="specs">
                        <el-input :value="data.specs"  readonly />
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input type="text" :value="data.price" :min="0"  size="small" :controls="false" readonly/>
                    </el-form-item>
                    <el-form-item label="数量" prop="num">
                        <el-input type="text" :value="data.num" :min="0"  size="small" :controls="false" readonly/>
                    </el-form-item>
                    <el-form-item label="付款方式" prop="payway">
                        <el-input :value="data.payway"  readonly />
                    </el-form-item>
                    <el-form-item label="配送状态" prop="sendState">
                        <el-input :value="ruleForm.sendState"  readonly />
                    </el-form-item>
                    <el-form-item label="配送员" prop="sender">
                        <el-input :value="data.sender"  readonly />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="text" :value="data.remark" readonly />
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

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import UseOrderCheck from './useOrderCheck'
let useOrderCheck = UseOrderCheck();

const props = defineProps({
    data:Object,
})

const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
const ruleForm = reactive({
    date:'',
    name: '',
    address: '',
    phone: '',
    goodsName:'',
    specs:'',
    price:0,
    num:0,
    payway:'微信支付',
    sendState:'0',
    sender:'配送员',
    remark:'',
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

</style>


