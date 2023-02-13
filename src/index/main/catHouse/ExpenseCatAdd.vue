<template>
    <div>
        <el-button type="primary"  size="small" @click="visible = true">添加分类</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加分类">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加分类</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div class="brand-add">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="分类名称" prop="name">
                        <el-input type="text" v-model="ruleForm.name" clearable />
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input type="text" v-model="ruleForm.description" clearable />
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
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import operation from "../../../common/util/operation";
import request from "../../../request/request";
import api from "../../../request/api";

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: "",
    description:''
});

const close = function(){
    visible.value = false;
}

const rules = reactive({
    name: [{required: true, message: "请输入分类名称",trigger: "blur", }],
});


const addExpenseCat = function(){
    request.post(api.sysAddExpenseCategory,{
        name:ruleForm.name,
        description:ruleForm.description
    }).then(res =>{
        if (res.data.code === 200) {
            operation.success("添加成功");
            visible.value = false;
        } else {
            operation.warning(res.data.msg)
        }
        close();
    })
}



const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            addExpenseCat();
        } else {
            operation.warning("请输入品牌名称");
        }
    });
};
</script>

<style scoped>

</style>
