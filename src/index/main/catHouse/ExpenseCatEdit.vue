<template>
    <div>
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
import { ref, reactive, watch } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import operation from "../../../common/util/operation";
import request from "../../../request/request";
import api from "../../../request/api";


const props = defineProps({
    id:String,
})
const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
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

watch(visible, (newValue, oldValue) => {
    if (newValue) {
        request.get(api.sysGetExpenseCategory, {
            params: {
                id: props.id
            }
        }).then(res => {
            if (res.data.code == 200) {
                const { name, description } = res.data.data.data;
                ruleForm.name = name;
                ruleForm.description = description;
            }
        })
    }
})


const uppdateExpenseCategory = function(){
    request.post(api.sysUpdateExpenseCategory,{
        id:props.id,
        name:ruleForm.name,
        description:ruleForm.description
    }).then(res =>{
        if (res.data.code === 200) {
            operation.success("添加成功");
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
            uppdateExpenseCategory();
        } else {
            operation.warning("请输入分类名称");
        }
    });
};
</script>

<style scoped>

</style>
