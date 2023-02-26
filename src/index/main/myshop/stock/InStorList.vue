<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInput v-model="search"></SearchInput>
            <SearchDate v-model="searchDate"></SearchDate>
            <SearchMonth v-model="searchMonth"></SearchMonth>
            <SearchYearVue v-model="searchYear"></SearchYearVue>
        </div>
        <div class="search-item">
            <InStorAdd></InStorAdd>
        </div>
    </div>
    <el-table :data="filterTableData" show-summary :summary-method="getSummaries" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="入库日期" prop="instockTime" sortable>
            <template #default="scope">
                {{ scope.row.instockTime.split("T")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName" min-width="180" />
        <el-table-column label="品牌" prop="brandName" />
        <el-table-column label="规格" prop="specs" />
        <el-table-column label="进货单价" prop="price" />
        <el-table-column label="进货数量" prop="num" sortable />
        <el-table-column label="进货金额" prop="money" sortable />
        <el-table-column label="回桶数量" prop="bucket" />
        <el-table-column label="备注" prop="remark" min-width="150" />
        <el-table-column align="center" fixed="right" label="操作" width="230">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" size="small" type="success"
                        @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" type="danger" size="small"
                        @click="handleDelete(scope.$index, scope.row)">退库</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>

    <InStorEdit :id="id" ref="editChild"></InStorEdit>
    <InStorView :data="data" ref="viewChild"></InStorView>
</template>
  
<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { Edit, View, Delete } from "@element-plus/icons-vue";
import InStorAdd from './InStorAdd.vue';
import InStorEdit from './InStorEdit.vue';
import InStorView from './InStorView.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import SearchInput from '../../../../common/components/search/SearchInput.vue';
import SearchDate  from '../../../../common/components/search/SearchDate.vue'
import dateUtil from '../../../../common/util/dateUtil';
import SearchMonth from '../../../../common/components/search/SearchMonth.vue';
import SearchYearVue from '../../../../common/components/search/SearchYear.vue';

const tableData = ref([])

const search = ref("")
const editChild = ref(null);
const viewChild = ref(null);
const searchDate = ref(dateUtil.getYMD(new Date()))
const searchMonth = ref(dateUtil.getYM(new Date()))
const searchYear = ref(dateUtil.getY(new Date()))

const filterTableData = computed(() => {
    let value = search.value;
    return tableData.value.filter(
        (data) => !value || data.goodsName.includes(value) || data.brandName.includes(value) || data.specs.includes(value)
    )
}

)
const data = ref({});
const id = ref('');

const handleEdit = (index, row) => {
    id.value = row.id;
    editChild.value.visible = true;
}

const handleView = (index, row) => {
    viewChild.value.visible = true;
    data.value = row;
}

const handleDelete = (index, row) => {
    operation.handleDelete(() => {
        request.get(api.deleteInstock, {
            id: row.id,
        }).then(res =>{
            if(res.data.code === 200){
                operation.success();
            }else{
                operation.warning();
            }
        })
    })

}

const getInstocks = function (type="month",date=searchMonth.value) {
    request.post(api.getInstocks, {
        shopId: localStorage.getItem("shopId"),
        type:type,
        date:date,
    }).then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.data;
        }else{
            tableData.value = [];
        }
    })
}

watch(searchDate,(newValue,oldValue)=>{
    if(newValue){
        getInstocks("date",newValue);
    }

})
watch(searchMonth,(newValue,oldValue)=>{
    if(newValue){
        getInstocks("month",newValue);
    }

})
watch(searchYear,(newValue,oldValue)=>{
    if(newValue){
        getInstocks("year",newValue);
    }

})

const getSummaries = (param) => {
    const sums = [];
    const sum_num = tableData.value.map(item => item.num).reduce((prev, curr) => {
        return prev + curr
    }, 0)
    const sum_money = tableData.value.map(item => item.num * item.price).reduce((prev, curr) => {
        return prev + curr
    }, 0)
    const sum_bucket = tableData.value.map(item => item.bucket).reduce((prev, curr) => {
        return prev + curr
    }, 0)
    sums[0] = '合计';
    sums[6] = '总数：' + sum_num;
    sums[7] = '总金额：￥' + sum_money;
    sums[8] = '总回桶数：' + sum_bucket;
    return sums
}

onMounted(() => {
    getInstocks();
})



</script>
  

<style scoped></style>


