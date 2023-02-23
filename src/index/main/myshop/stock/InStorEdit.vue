<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="修改入库" append-to-body>
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">修改入库</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="useStock.rules" label-width="100px">
                <el-form-item label="入库日期" prop="instockTime">
                    <el-date-picker v-model="ruleForm.instockTime" :value-format="'YYYY-MM-DD HH:mm:ss'" type="datetime"
                        placeholder="请选择入库时间" style="width:100%" />
                </el-form-item>
                <el-form-item label="商品名称" prop="goodsId" required>
                    <GoodsSelect :goodsId="ruleForm.goodsId" :changeGoods="changeGoods"></GoodsSelect>
                </el-form-item>
                <el-form-item label="进货单价" prop="price">
                    <el-input v-model.number="ruleForm.price" type="number" />
                </el-form-item>
                <el-form-item label="进货数量" prop="num">
                    <el-input v-model.number="ruleForm.num" type="number" />
                </el-form-item>
                <el-form-item label="进货金额" prop="money">
                    <el-input v-model.number="ruleForm.money" type="number" />
                </el-form-item>
                <el-form-item label="回桶数量" prop="bucket">
                    <el-input v-model.number="ruleForm.bucket" type="number" />
                </el-form-item>
                <el-form-item label="进货单据">
                    <Upload ref="upload_img" :file-list="imgList()" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="ruleForm.remark" clearable />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup>
import { ref, reactive, watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import Upload from '../../../../common/components/Upload.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import useStock from './useStock'
import GoodsSelect from '../../../../common/components/select/GoodsSelect.vue';
import operation from '../../../../common/util/operation';
import jwtUtil from '../../../../common/util/jwtUtil';

const props = defineProps({
    id: String,
})
const upload_img = ref();
const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
const ruleForm = reactive({
    id: '',
    instockTime: new Date(),
    goodsId: null,
    shopId: localStorage.getItem("shopId"),
    imgId: '',
    price: 0,
    num: 0,
    bucket: 0,
    money: 0,
    remark: '',
})
watch([() => ruleForm.price, () => ruleForm.num], (newValue, oldValue) => {
    ruleForm.money = newValue[0] * newValue[1];
}
);

watch(visible, (newValue, oldValue) => {
    if (newValue) {
        request.get(api.getInstock, {
            params: {
                id: props.id
            }
        }).then(res => {
            if (res.data.code === 200) {
                const { id, instockTime, goodsId, shopId, imgId, price, num, bucket, money, remark } = res.data.data.data;
                ruleForm.id = id;
                ruleForm.instockTime = instockTime;
                ruleForm.goodsId = goodsId;
                ruleForm.shopId = shopId;
                ruleForm.imgId = imgId;
                ruleForm.price = price;
                ruleForm.num = num;
                ruleForm.bucket = bucket;
                ruleForm.money = money;
                ruleForm.remark = remark;
            }
        })
    }
})

const imgList = () => [
    {
        name: 'img.jpg',
        url: jwtUtil.getImgUrl(ruleForm.imgId),
    },
]

const changeGoods = function (data) {
    ruleForm.goodsId = data.value;
}

const close = function () {
    visible.value = false;
}

const updateInstock = function () {
    upload_img.value.submitUpload().then(res => {
        const imgId = res.data.data.fileId;
        ruleForm.imgId = imgId || ruleForm.imgId;
        request.post(api.updateInstock, {
            id: ruleForm.id,
            instockTime: ruleForm.instockTime,
            goodsId: ruleForm.goodsId,
            shopId: ruleForm.shopId,
            imgId: ruleForm.imgId,
            price: ruleForm.price,
            num: ruleForm.num,
            bucket: ruleForm.bucket,
            money: ruleForm.money,
            remark: ruleForm.remark,
        }).then(res => {
            if (res.data.code === 200) {
                operation.success();
            } else {
                operation.warning();
            }
            close();
        })
    });
}

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            updateInstock();
        } else {
            operation.warning("校验失败");
        }
    })
}


</script>
  
<style scoped></style>


