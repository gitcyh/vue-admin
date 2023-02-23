<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
        </div>
        <CustomerAddVue></CustomerAddVue>
    </div>

    <el-table :data="filterTableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="createTime" width="120">
            <template #default="scope">
                {{ scope.row.createTime.split(" ")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="客户名称" prop="name" />
        <el-table-column label="地址" prop="address" min-width="300" />
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="微信号" prop="wechat" />
        <el-table-column label="结算方式" prop="settlement">
            <template #default="scope">
                {{ useCustomer.getSettlement(scope.row.settlement) }}
            </template>
        </el-table-column>
        <el-table-column label="押金管理" width="100">
            <template #default="scope">
                <DepositMgr :customerId="scope.row.id"></DepositMgr>
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" min-width="180" />
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
    <CustomerEditVue ref="editChild" :id="id"></CustomerEditVue>
    <CustomerViewVue ref="viewChild" :data="data"></CustomerViewVue>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { Delete, Edit, View } from "@element-plus/icons-vue";
import Operation from '../../../../common/util/operation';
import CustomerAddVue from './CustomerAdd.vue';
import CustomerEditVue from './CustomerEdit.vue';
import CustomerViewVue from './CustomerView.vue';
import DepositMgr from './DepositMgr.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import useCustomer from './useCustomer';
import SearchInputVue from '../../../../common/components/search/SearchInput.vue';

const tableData = ref([]);
const search = ref('')
const filterTableData = computed(() => {
    let value = search.value;
    return tableData.value.filter(
        (data) => {
            return !value || data.name.includes(value) || data.address.includes(value) 
            || data.phone.includes(value) || data.wechat.includes(value)
        }
    )
})

const editChild = ref('');
const viewChild = ref('');
const data = ref({});
const id = ref("");
const handleEdit = (index, row) => {
    editChild.value.visible = true;
    id.value = row.id;
}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}

const handleDelete = (index, row) => {
    Operation.handleDelete(function () {
        request.get(api.deleteCustomer, {
            params: {
                id: row.id,
            }
        }).then(res => {
            if (res.data.code === 200) {
                operation.success();
            } else {
                operation.warning();
            }
        })
    })
}


const getCustomers = function () {
    request.post(api.getCustomers, {
        shopId: localStorage.getItem("shopId")
    }).then(res => {
        tableData.value = res.data.data.data;
    })
}

onMounted(() => {
    getCustomers();
})
</script>
  

<style scoped></style>


