<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加分类</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加分类" append-to-body top="5vh">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加分类</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="ruleForm.name" clearable />
                    </el-form-item>
                    <el-form-item label="二级标题" prop="subTitle">
                        <el-input type="text" v-model="ruleForm.subTitle" clearable />
                    </el-form-item>
                    <el-form-item label="分类级别" prop="level">
                        <el-radio-group v-model="ruleForm.level">
                            <el-radio label="1">一级分类</el-radio>
                            <el-radio label="2">其他</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="所属分类" prop="parentId" v-show="ruleForm.level === '2'">
                        <TreeSelect :value="ruleForm.parentId" :nodeClick="nodeClick"></TreeSelect>
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
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import useCat from './useCat'
import operation from '../../../common/util/operation'
import request from '../../../request/request'
import api from '../../../request/api'
import TreeSelect from '../../../common/components/select/TreeSelect.vue'


const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: '',
    subTitle: null,
    level: "2",
    deep:"1",
    parentId: null,
})

const nodeClick = function (id,deep) {
    ruleForm.parentId = id;
    ruleForm.deep = deep;
}

const validatePId = (rule, value, callback) => {
    if (ruleForm.level === '1') {
        ruleForm.parentId = null;
        callback();
    } else {
        if (!ruleForm.parentId) {
            callback(new Error('请选择所属分类'))
        } else {
            callback()
        }
    }
}

const rules = reactive({
    name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
    level: [{ required: true, message: '请选择分类级别', trigger: 'blur' }],
    parentId: [{ required: true, validator: validatePId, trigger: 'blur' }]
})


const addCategory = function () {
    request.post(api.sysAddCategory, {
        name: ruleForm.name,
        subTitle: ruleForm.subTitle,
        level: ruleForm.deep,
        parentId: ruleForm.parentId,
    }).then(res => {
        if (res.data.code === 200) {
            operation.success("添加成功");
            visible.value = false;
        } else {
            operation.warning(res.data.msg)
        }
    })
}


const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
           addCategory();
        } else {
            operation.warning("商品信息有误");
        }
    })
}

</script>
  
<style scoped>

</style>


