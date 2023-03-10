<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
        </div>
        <div class="search-item">
            <CustomerAddVue></CustomerAddVue>
            <UploadButton :uploadUrl="uploadUrl"></UploadButton>
        </div>
    </div>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="84vh" max-height="84vh">
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
                <el-button color="#626aef" size="small" @click="handleDeposit(scope.$index, scope.row)">押金单</el-button>
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" min-width="180" />
        <el-table-column align="right" label="操作" width="230">
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
    <Pages :total="total" :getData="getData"></Pages>
    <CustomerEditVue ref="editChild" :id="id"></CustomerEditVue>
    <CustomerViewVue ref="viewChild" :data="data"></CustomerViewVue>
    <DepositMgr ref="deposit" :customerId="customerId"></DepositMgr>
</template>
  
<script setup>

import { computed, ref, onMounted, watch } from 'vue'
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
import UploadButton from '../../../../common/components/UploadButton.vue';
import Pages from '../../../../common/components/Pages.vue';

const tableData = ref([]);
const search = ref('')
// const filterTableData = computed(() => {
//     let value = search.value;
//     return tableData.value.filter(
//         (data) => {
//             return !value || data.name?.includes(value) || data.address.includes(value)
//                 || data.phone?.includes(value) || data.wechat?.includes(value)
//         }
//     )
// })
const uploadUrl = ref("/api" + api.uploadCustomer)
const editChild = ref('');
const viewChild = ref('');
const data = ref({});
const id = ref("");
const handleEdit = (index, row) => {
    id.value = row.id;
    setTimeout(()=>{
        editChild.value.visible = true;
    },50)
}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}
const deposit = ref();
const customerId = ref('');
const handleDeposit = function(index, row){
    customerId.value = row.id;
    setTimeout(()=>{
        deposit.value.visible = true;
    },50) 
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
const getData = function(currentPage,pageSize){
    getCustomers(currentPage,pageSize);
}
const loading = ref(false);
const getCustomers = function (currentPage=1,pageSize=100) {
    loading.value = true;
    request.post(api.getCustomers, {
        shopId: localStorage.getItem("shopId"),
        currentPage:currentPage,
        pageSize:pageSize,
        value:search.value
    }).then(res => {
        loading.value = false;
        if(res.data.code === 200){
            tableData.value = res.data.data.data;
        }else{
            tableData.value = [];
        }
    })
}

watch(search,(newValue,oldValue)=>{
    if(newValue != oldValue){
        getCount();
        getCustomers()
    }
})

const total = ref(100);
const getCount = function(){
    request.get(api.getCountCustomers, {
        params:{
            shopId: localStorage.getItem("shopId"),
            value: search.value
        }
    }).then(res => {
        total.value = res.data.data.data;
        console.log(total.value)
    })
}

onMounted(() => {
    getCount();
    getCustomers();
})
</script>
  

<style scoped></style>


