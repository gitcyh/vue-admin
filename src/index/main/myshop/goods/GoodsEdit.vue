<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="编辑商品" top="2vh">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">编辑商品</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <div style="overflow-y: auto;height: 80vh;">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="useGoodsCheck.rules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入商品名称" clearable />
                </el-form-item>
                <el-form-item label="品牌名称" prop="brand">
                        <BrandVue v-model="ruleForm.brand"></BrandVue>
                    </el-form-item>
                <el-form-item label="商品分类" prop="categoryId">
                    <TreeSelect :value="ruleForm.categoryId" :nodeClick="nodeClick" style="width:100%"></TreeSelect>
                </el-form-item>
                <el-form-item label="规格" prop="specs">
                    <el-input type="text" v-model="ruleForm.specs"  placeholder="请输入商品规格例如：18.9L/桶" clearable />
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
                    <Upload ref="upload_imgId" :file-list="imgList()"></Upload>
                </el-form-item>
                <el-form-item label="商品描述" prop="goodsDesc">
                    <EditorVue ref="editorRef" :pushImageList="pushImageList" :valueHtml="ruleForm.goodsDesc"
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
</template>
  
<script setup>
import { ref, reactive, watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import useGoodsCheck from './useGoods'
import BrandVue from '../../../../common/components/select/Brand.vue'
import TreeSelect from '../../../../common/components/select/TreeSelect.vue'
import Upload from '../../../../common/components/Upload.vue'
import EditorVue from '../../../../common/components/Editor.vue'
import useGoods from '../../goodsHouse/useGoods'
import jwtUtil from '../../../../common/util/jwtUtil'
import request from '../../../../request/request'
import api from '../../../../request/api'
import operation from '../../../../common/util/operation'

const ruleFormRef = ref();
const visible = ref(false);
const editorRef = ref();
defineExpose({
    visible
})

const close = function () {
    visible.value = false;
}

const props = defineProps({
    id: String,
})

const ruleForm = reactive({
    id: '',
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

const imgList = function () {
    return [
        {
            name: 'imgx.jpg',
            url: jwtUtil.getImgUrl(ruleForm.imgId),
        },
    ]
}

const nodeClick = function (id, deep) {
    ruleForm.categoryId = id;
}

const changeValue = function (value) {
    ruleForm.brand = value;
}

const changeEditor = function (value) {
    ruleForm.goodsDesc = value;
}
// 所有上传图片的集合
const imageList1 = [];

const pushImageList = function (src) {
    imageList1.push(getId(src));
}

watch(visible, (newValue, oldValue) => {
    if (newValue) {
        useGoodsCheck.getGoods(props.id).then(res => {
            if (res.data.code == 200) {
                const { id,imgId, goodsName, brandName, specs, goodsDesc, categoryId, costPrice, deliveryPrice, selfPrice } = res.data.data.data
                ruleForm.id = id;
                ruleForm.imgId = imgId;
                ruleForm.name = goodsName;
                ruleForm.brand = brandName;
                ruleForm.categoryId = categoryId;
                ruleForm.specs = specs;
                ruleForm.goodsDesc = goodsDesc;
                ruleForm.costPrice = costPrice;
                ruleForm.deliveryPrice = deliveryPrice;
                ruleForm.selfPrice = selfPrice;
            }
        })
    }
})

const upload_imgId = ref();

const updateSysGoods = function () {
    useGoods.beforeAdd(imageList1, editorRef);
    upload_imgId.value.submitUpload().then(res => {
        const imgId = res.data.data.fileId;
        ruleForm.imgId = imgId;
        request.post(api.updateGoods, {
            id: ruleForm.id,
            goodsName: ruleForm.name,
            brandName: ruleForm.brand,
            categoryId: ruleForm.categoryId,
            specs: ruleForm.specs,
            goodsDesc: ruleForm.goodsDesc,
            imgId: ruleForm.imgId,
            costPrice: ruleForm.costPrice,
            deliveryPrice: ruleForm.deliveryPrice,
            selfPrice: ruleForm.selfPrice,
        }).then(res => {
            if (res.data.code === 200) {
                operation.success("修改成功");
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
            updateSysGoods();
        } else {
            operation.warning("商品信息有误");
        }
    })
}

</script>
  
<style scoped></style>


