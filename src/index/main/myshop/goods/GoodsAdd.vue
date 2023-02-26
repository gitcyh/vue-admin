<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加商品</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加商品" top="2vh">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加商品</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div style="overflow-y: auto;height: 80vh;">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useGoods.rules" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="name">
                        <div style="display:flex;width:100%">
                            <el-input v-model="ruleForm.name" placeholder="请输入商品名称" clearable style="width:300px" />
                            <div style="width:120px;margin-left:20px">或从系统中选择:</div>
                            <GoodsSysSelect style="width:300px" :changeGoods="changeGoods"></GoodsSysSelect>
                        </div>
                    </el-form-item>
                    <el-form-item label="品牌名称" prop="brand">
                        <BrandVue v-model="ruleForm.brand"></BrandVue>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="categoryId">
                        <TreeSelect :value="ruleForm.categoryId" :nodeClick="nodeClick" style="width:100%"></TreeSelect>
                    </el-form-item>
                    <el-form-item label="规格" prop="specs">
                        <el-input type="text" v-model="ruleForm.specs" placeholder="请输入商品规格例如：18.9L/桶" clearable />
                    </el-form-item>
                    <el-form-item label="成本价" prop="costPrice">
                        <el-input v-model.number="ruleForm.costPrice" clearable />
                    </el-form-item>
                    <el-form-item label="配送价" prop="deliveryPrice">
                        <el-input v-model.number="ruleForm.deliveryPrice" clearable />
                    </el-form-item>
                    <el-form-item label="自提价" prop="selfPrice">
                        <el-input v-model.number="ruleForm.selfPrice" clearable />
                    </el-form-item>
                    <el-form-item label="商品图片" prop="imgId">
                        <Upload ref="upload_imgId" :file-list="getImgList()"></Upload>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="goodsDesc">
                        <EditorVue ref="editorRef" :pushImageList="pushImageList" :valueHtml="ruleForm.goodsDesc"
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
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import BrandVue from '../../../../common/components/select/Brand.vue';
import useGoods from './useGoods'
import TreeSelect from '../../../../common/components/select/TreeSelect.vue'
import Upload from '../../../../common/components/Upload.vue';
import EditorVue from '../../../../common/components/Editor.vue';
import operation from '../../../../common/util/operation';
import sysUseGoods from '../../goodsHouse/useGoods'
import request from '../../../../request/request';
import api from '../../../../request/api';
import GoodsSysSelect from '../../../../common/components/select/GoodsSysSelect.vue';
import jwtUtil from '../../../../common/util/jwtUtil';


const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: '',
    brand: '',
    categoryId: '',
    specs: '',
    costPrice: 0,
    deliveryPrice: 0,
    selfPrice: 0,
    goodsDesc: '',
    imgId: '',
    goodsDesc: '',
})

const close = function () {
    visible.value = false;
}

const nodeClick = function (id, deep) {
    ruleForm.categoryId = id;
}

const getImgList = function () {
    if (ruleForm.imgId) {
        return [
            {
                name: 'imgx.jpg',
                url: jwtUtil.getImgUrl(ruleForm.imgId),
            },
        ]
    }
    return [];
}

const changeGoods = function (data) {
    ruleForm.name = data.label;
    ruleForm.specs = data.specs;
    ruleForm.categoryId = data.categoryId;
    ruleForm.brand = data.brandName;
    if (data.imgId) {
        ruleForm.imgId = data.imgId;
    }
}


const changeEditor = function (value) {
    ruleForm.goodsDesc = value;
}
// 所有上传图片的集合
const imageList1 = [];

const pushImageList = function (src) {
    imageList1.push(getId(src));
}

const editorRef = ref();

const upload_imgId = ref();


const addSysGoods = function () {
    sysUseGoods.beforeAdd(imageList1, editorRef);
    upload_imgId.value.submitUpload().then(res => {
        const imgId = res.data.data.fileId;
        ruleForm.imgId = imgId;
        request.post(api.addGoods, {
            shopId: localStorage.getItem("shopId"),
            costPrice: ruleForm.costPrice,
            deliveryPrice: ruleForm.deliveryPrice,
            selfPrice: ruleForm.selfPrice,
            goodsName: ruleForm.name,
            brandName: ruleForm.brand,
            categoryId: ruleForm.categoryId,
            specs: ruleForm.specs,
            goodsDesc: ruleForm.goodsDesc,
            imgId: ruleForm.imgId,
        }).then(res => {
            if (res.data.code === 200) {
                operation.success("添加成功");
            } else {
                operation.warning(res.data.msg)
            }
            close();
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
  
<style scoped>
/* .goods-add  .el-dialog__header {
    height: 30px;
    padding-left: 4px;
    padding-top: 4px;
    padding-right: 10px;
} */
</style>


