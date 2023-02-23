<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
        </div>
    </div>

    <el-table :data="filterTableData" border style="width: 100%;">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="createTime" sortable width="140">
            <template #default="scope">
                {{ scope.row.createTime.split(" ")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="shopName" min-width="200" />
        <el-table-column label="店铺地址" prop="shopAddress" />
        <el-table-column label="店铺电话" prop="shopTel" />
        <el-table-column label="店主姓名" prop="shopKeeper" />
        <el-table-column label="店主手机号" prop="telephone" />
        <el-table-column label="公司名称" prop="shopCompany" />
        <el-table-column label="审核状态" prop="applyStatus" sortable>
            <template #default="scope">
                {{ getApplyState(scope.row.applyStatus) }}
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="160">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" type="success" size="small"
                        @click="handleView(scope.$index, scope.row)">详情</el-button>
                    <el-button :icon="Position" type="primary" size="small"
                        @click="checkShop(scope.$index, scope.row)">审核</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <ShopViewVue ref="viewChild" :data="data"></ShopViewVue>
    <CheckShop ref="editChild" :data="data"></CheckShop>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { Position, View } from "@element-plus/icons-vue";
import ShopViewVue from './ShopView.vue';
import CheckShop from './CheckShop.vue';
import request from '../../../request/request';
import api from '../../../request/api';
import SearchInputVue from '../../../common/components/search/SearchInput.vue';

const tableData = ref([])

const search = ref('')
const filterTableData = computed(() => {
    let value = search.value;
    return tableData.value.filter(data => {
        return !value || data.shopName.includes(value) || data.shopAddress.includes(value) || data.shopTel.includes(value)
            || data.shopKeeper.includes(value) || data.telephone.includes(value) || data.shopCompany.includes(value)
    })
})

const editChild = ref('');
const viewChild = ref('');
const data = ref({});

const checkShop = (index, row) => {
    data.value = row;
    editChild.value.visible = true;
}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}

const getApplyState = function (applyStatus) {
    if (applyStatus === 0) {
        return "待审核"
    } else if (applyStatus === -1) {
        return "审核不通过"
    } else if (applyStatus === 1) {
        return "审核通过"
    } else {
        return "待审核"
    }
}


const getShops = function () {
    request.post(api.getShops).then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.data;
        }
    })
}

onMounted(() => {
    getShops();
})




</script>
  

<style scoped></style>


