<template>
    <div>
        <el-dialog v-model="visible" :show-close="false" draggable title="查看入库" append-to-body>
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">查看入库</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm"  label-width="100px">
                    <el-form-item label="入库日期" prop="date">
                        <el-input type="text" :value="ruleForm.date" readonly />
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input type="text" :value="ruleForm.goodsName" readonly />
                    </el-form-item>
                    <el-form-item label="单价" prop="price">
                        <el-input :value="ruleForm.price" type="number"  readonly />
                    </el-form-item>
                    <el-form-item label="进货数量" prop="num">
                        <el-input :value="ruleForm.num" type="number"  readonly />
                    </el-form-item>
                    <el-form-item label="回桶数量" prop="bucket">
                        <el-input :value="ruleForm.bucket" type="number" readonly />
                    </el-form-item>
                    <el-form-item label="金额" prop="money">
                        <el-input :value="ruleForm.money" type="number"  readonly/>
                    </el-form-item>
                    <el-form-item label="进货单据">
                        <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" fit="fill" :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :value="ruleForm.remark" readonly />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'


const props = defineProps({
    data:Object,
})


const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
const ruleForm = reactive({
    date: '2016-05-03',
    brand: '农夫山泉',
    name: '农夫山泉纯净水',
    specs: '18L/桶',
    price: '15',
    num: '20',
    money: '300',
    remark: '无',
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
        operation.warning("校验失败");
    }
  })
}


</script>
  
<style scoped>



</style>


