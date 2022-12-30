<template>
      <el-dialog v-model="visible" :show-close="false" draggable title="查看员工">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h6 :id="titleId" :class="titleClass">查看员工</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="data"  label-width="120px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input :value="data.name" readonly />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" readonly>
                        <el-radio-group :value="data.sex">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="1女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input :value="data.age" readonly />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" :value="data.phone" readonly />
                    </el-form-item>
                    <el-form-item label="身份证" prop="IDCard">
                        <el-input type="text" :value="data.IDCard" readonly />
                    </el-form-item>
                    <el-form-item label="入职日期">
                        <el-date-picker :value="data.date" type="date" readonly  label="请选择日期"  placeholder="请选择日期" style="width: 100%"/>
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


const ruleFormRef = ref();
const visible = ref(false);

defineExpose({
    visible
})
const ruleForm = reactive({
    name: '',
    age: '',
    sex: '0',
    phone: '',
    IDCard: '',
    date:'',
    address: '',
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


