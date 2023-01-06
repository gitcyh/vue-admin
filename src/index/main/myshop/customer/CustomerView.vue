<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="查看客户">
          <template #header="{ close, titleId, titleClass }">
              <div class="my-header">
                  <h6 :id="titleId" :class="titleClass">查看客户</h6>
                  <el-button @click="close" :icon="CloseBold" circle />
              </div>
          </template>
          <div>
              <el-form ref="ruleFormRef" :model="data"  label-width="120px" class="demo-ruleForm">
                <el-form-item label="客户名称" prop="name">
                        <el-input :value="data.name" readonly />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" :value="data.phone" readonly />
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input :value="data.address" type="text" readonly />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="text" :value="data.remark" readonly />
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
    name: '',
    phone: '',
    address: '',
    remark:'',
})

const close = function(){
  visible.value = false;
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


