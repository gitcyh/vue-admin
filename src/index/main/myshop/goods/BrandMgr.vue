<template>
    <div>
        <el-button type="success" size="small" @click="visible = true">品牌管理</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="品牌管理">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">品牌管理</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div class="brand-add">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="品牌名称" prop="brand">
                        <el-input v-model="ruleForm.brand" clearable />
                    </el-form-item>
                    <el-form-item class="brand-btn">
                        <el-button @click="submitForm(ruleFormRef)" type="primary">添加品牌</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="brand-list">
                <el-table :data="tableData" border max-height="600">
                    <el-table-column label="序号" type="index" width="60" />
                    <el-table-column label="日期" prop="date" sortable />
                    <el-table-column label="品牌名称" prop="brand" sortable >
                        <template #default="scope">
                            <el-input v-if="currentIndex === scope.$index" @blur="hideInput"  size="mini"  v-model="scope.row.brand"></el-input>
                            <span v-else>{{scope.row.brand}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="right" label="操作">
                        <template #default="scope">
                            <el-button-group>
                                <el-button :icon="Edit" type="primary" size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button :icon="Delete" size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold, Delete, Edit } from '@element-plus/icons-vue'
import operation from '../../../../common/util/operation';

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    brand: '',
})
const currentIndex = ref("")

const rules = reactive({
    brand: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
})

const hideInput = function(){
    currentIndex.value = "";
}

const handleEdit = function(index, row){
    currentIndex.value = index;
}

const handleDelete = function(index, row){
    operation.handleDelete(function(){
        console.log(index,row);
    })
}

const tableData = [
    {
        date: '2016-05-03',
        brand: '农夫山泉',
    },
    {
        date: '2016-05-02',
        brand: '王老吉',
    },
    {
        date: '2016-05-04',
        brand: '怡宝',
    },
    {
        date: '2016-05-01',
        brand: '景甜',
    },
]


const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            operation.warning("请输入品牌名称");
        }
    })
}

</script>
  
<style scoped>




.brand-btn:deep().el-form-item__content {
    flex-direction: row-reverse
}
</style>


