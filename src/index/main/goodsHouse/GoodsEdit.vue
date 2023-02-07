<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="编辑商品">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">编辑商品</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="useGoods.rules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name" clearable />
                </el-form-item>
                <BrandVue :brand="ruleForm.brand" :changeValue="changeValue"></BrandVue>
                <el-form-item label="规格" prop="specs">
                    <el-input type="text" v-model="ruleForm.specs" clearable />
                </el-form-item>
                <el-form-item label="商品描述" prop="description">
                    <EditorVue ref="editorRef" :pushImageList="pushImageList" :valueHtml="ruleForm.description"
                        :changeValue="changeEditor"></EditorVue>
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
import { ref, reactive,watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import useGoods from './useGoods'
import operation from '../../../common/util/operation'
import BrandVue from './Brand.vue'
import EditorVue from '../../../common/components/Editor.vue'
import request from '../../../request/request'
import api from '../../../request/api'

const props = defineProps({
    data: Object,
    id: String,
})
const ruleForm = reactive({
    id: '',
    name: '',
    brand: '',
    specs: '',
    description: '',
})
const ruleFormRef = ref();
const editorRef = ref();
const visible = ref(false);

defineExpose({
    visible
})

const changeValue = function (value) {
    ruleForm.brand = value;
}

const changeEditor = function (value) {
    ruleForm.description = value;
}
// 所有上传图片的集合
const imageList1 = [];

const pushImageList = function (src) {
    imageList1.push(getId(src));
}

watch(visible, (newValue, oldValue) => {
    if (newValue) {
        useGoods.getGoods(props.id).then(res => {
            if (res.data.code == 200) {
                const {id,goodsName,brandName,specs,goodsDesc} = res.data.data.data
                ruleForm.id = id;
                ruleForm.name = goodsName;
                ruleForm.brand = brandName,
                ruleForm.specs = specs;
                ruleForm.description = goodsDesc;
            }
        })
    }
})

const updateSysGoods = function () {
    useGoods.beforeAdd(imageList1, editorRef);
    request.post(api.sysUpdateGoods, {
        id: ruleForm.id,
        goodsName: ruleForm.name,
        brandName: ruleForm.brand,
        specs: ruleForm.specs,
        goodsDesc: ruleForm.description,
    }).then(res => {
        if (res.data.code === 200) {
            operation.success("添加成功")
        } else {
            operation.warning(res.data.msg)
        }
    })
}



const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            updateSysGoods();
        } else {
            operation.warning("商品信息有误");
        }
    })
}

</script>
  
<style scoped>

</style>


