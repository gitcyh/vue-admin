<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加商品</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加商品" append-to-body top="4vh">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加商品</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useGoods.rules" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleForm.name" clearable />
                    </el-form-item>
                    <el-form-item label="品牌名称" prop="brand">
                        <BrandVue v-model="ruleForm.brand"></BrandVue>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="categoryId">
                        <TreeSelect :value="ruleForm.categoryId" :nodeClick="nodeClick" style="width:100%"></TreeSelect>
                    </el-form-item>
                    <el-form-item label="规格" prop="specs">
                        <el-input type="text" v-model="ruleForm.specs" clearable />
                    </el-form-item>
                    <el-form-item label="商品图片" prop="imgId">
                        <Upload ref="upload_imgId"></Upload>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="description">
                        <EditorVue ref="editorRef" :pushImageList="pushImageList" :valueHtml="ruleForm.description"
                            :changeValue="changeEditor"></EditorVue>
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
import { ref, reactive,inject } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import useGoods from './useGoods'
import operation from '../../../common/util/operation'
import BrandVue from '../../../common/components/select/Brand.vue'
import EditorVue from '../../../common/components/Editor.vue'
import TreeSelect from '../../../common/components/select/TreeSelect.vue'
import request from '../../../request/request'
import api from '../../../request/api'
import Upload from '../../../common/components/Upload.vue'



const editorRef = ref();
const upload_imgId = ref();
const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: '',
    brand: '',
    categoryId: '',
    specs: '',
    description: '',
    imgId: '',
})


const refresh = inject("refresh");

const close = function () {
    visible.value = false;
}

const nodeClick = function (id, deep) {
    ruleForm.categoryId = id;
}


const changeEditor = function (value) {
    ruleForm.description = value;
}
// 所有上传图片的集合
const imageList1 = [];

const pushImageList = function (src) {
    imageList1.push(getId(src));
}



const addSysGoods = function () {
    useGoods.beforeAdd(imageList1, editorRef);
    upload_imgId.value.submitUpload().then(res => {
        const imgId = res.data.data.fileId;
        ruleForm.imgId = imgId;
        request.post(api.sysAddGoods, {
            goodsName: ruleForm.name,
            brandName: ruleForm.brand,
            categoryId: ruleForm.categoryId,
            specs: ruleForm.specs,
            goodsDesc: ruleForm.description,
            imgId:ruleForm.imgId,
        }).then(res => {
            if (res.data.code === 200) {
                operation.success("添加成功");
                close();
                refresh();
            } else {
                operation.warning(res.data.msg)
            }
        })
    });

}


const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            addSysGoods();
        } else {
            operation.warning("商品信息有误");
        }
    })
}

</script>
  
<style scoped></style>


