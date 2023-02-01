<template>
    <div>
        <el-dialog v-model="visible" :show-close="false" draggable title="查看押金单" append-to-body="true">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">查看押金单</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" label-width="100px">
                    <el-form-item label="日期" prop="date">
                        <el-input type="textarea" :value="data.date" readonly />
                    </el-form-item>
                    <el-form-item label="押金描述" prop="descrition">
                        <el-input type="textarea" :value="data.descrition" readonly />
                    </el-form-item>
                    <el-form-item label="押金金额" prop="money">
                        <el-input :value="data.money" type="number" style="width:214px"  readonly/>
                    </el-form-item>
                    <el-form-item label="押桶数量" prop="num">
                        <el-input :value="data.num" type="number" style="width:214px"  readonly/>
                    </el-form-item>
                    <el-form-item label="押金状态" prop="depositState">
                        <el-input :value="data.depositState" type="text" style="width:214px"  readonly/>
                    </el-form-item>
                    <el-form-item label="押金单据">
                        <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" fit="fill" :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :value="data.remark" readonly />
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'


const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
])

const ruleFormRef = ref();
const visible = ref(false);
const props = defineProps({
    data:Object,
})
defineExpose({
    visible
})
const ruleForm = reactive({
    money: '',
    num: 0,
    descrition: '',
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


