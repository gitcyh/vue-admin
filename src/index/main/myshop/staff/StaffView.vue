<template>
      <el-dialog v-model="visible" :show-close="false" draggable title="查看员工">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">查看员工</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="data"  label-width="100px">
                    <el-form-item label="姓名" prop="name">
                        <el-input type="text" :value="data.name" readonly />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" readonly>
                        <el-input type="text" :value="data.sex === 0 ? '男' : '女'" readonly />
                    </el-form-item>
                    <el-form-item label="入职日期">
                        <el-input type="text" :value="data.entryDate" readonly />
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input type="text" :value="data.age" readonly />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" :value="data.phone" readonly />
                    </el-form-item>
                    <el-form-item label="身份证" prop="idCard">
                        <el-input type="text" :value="data.idCard" readonly />
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input :value="data.address" type="textarea" readonly />
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

const visible = ref(false);

defineExpose({
    visible
})

const close = function(){
    visible.value = false;
}

</script>
  
<style scoped>

</style>


