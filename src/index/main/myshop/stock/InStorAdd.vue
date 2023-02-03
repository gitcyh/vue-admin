<template>
    <div>
        <el-button type="primary" size="small" @click="visible = true">添加入库</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加入库" append-to-body="true">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加入库</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm"  label-width="100px">
                    <el-form-item label="入库日期" prop="date">
                        <el-date-picker v-model="date" type="datetime" placeholder="请选择入库时间" style="width:100%" />
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input type="text" v-model="ruleForm.goodsName" clearable  />
                    </el-form-item>
                    <el-form-item label="单价" prop="price">
                        <el-input v-model="ruleForm.price" type="number"  />
                    </el-form-item>
                    <el-form-item label="进货数量" prop="num">
                        <el-input v-model="ruleForm.num" type="number"  />
                    </el-form-item>
                    <el-form-item label="回桶数量" prop="bucket">
                        <el-input v-model="ruleForm.bucket" type="number"  />
                    </el-form-item>
                    <el-form-item label="金额" prop="money">
                        <el-input v-model="ruleForm.money" type="number"  />
                    </el-form-item>
                    <el-form-item label="进货单据">
                        <Upload :fileList="fileList"/>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="ruleForm.remark" clearable />
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
import Upload from '../../../../common/components/Upload.vue';




const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
])

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    date: '2016-05-03',
    brand: '农夫山泉',
    name: '农夫山泉纯净水',
    specs: '18L/桶',
    price: '15',
    num: '20',
    bucket:20,
    money: '300',
    remark: '无',
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


