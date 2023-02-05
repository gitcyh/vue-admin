<template>
    <div>
        <el-button type="primary" size="small" @click="visible = true">押金管理</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="押金管理" append-to-body width="70%">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">押金管理</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <DepositAddVue></DepositAddVue>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column label="序号" type="index" width="60" />
                    <el-table-column label="日期" prop="date" width="120" />
                    <el-table-column label="押金描述" prop="descrition" width="300"/>
                    <el-table-column label="押金金额" prop="money" width="100" />
                    <el-table-column label="押桶数量" prop="num" width="100" />
                    <el-table-column label="押金状态" prop="depositState" width="100"  />
                    <el-table-column label="备注" prop="remark"  />
                    <el-table-column align="right" label="操作" width="220">
                        <template #default="scope">
                            <el-button-group>
                                <el-button :icon="View" type="success" size="small"
                                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                                <el-button :icon="Edit" type="primary" size="small"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button :icon="Delete" size="small" type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <DepositEditVue ref="editChild" :data="data"></DepositEditVue>
                <DepositViewVue ref="viewChild" :data="data"></DepositViewVue>
            </div>

        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold,Delete,View,Edit } from '@element-plus/icons-vue'
import DepositAddVue from './DepositAdd.vue'
import DepositEditVue from './DepositEdit.vue'
import DepositViewVue from './DepositView.vue'

const visible = ref(false);

const editChild = ref('');
const viewChild = ref('');
const data = ref('');


const handleEdit = (index, row) => {
    data.value = row;
    editChild.value.visible = true;
}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}

const handleDelete = (index, row) => {
    Operation.handleDelete(function(){
        console.log(index, row);
    })
}



const tableData = [
    {
        date:'2022-12-12',
        descrition: '3桶怡宝押金',
        money: '120',
        num: '3',
        depositState:'0',
        remark:'',
    },
]

</script>
  
<style scoped>



</style>


