<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
            <SearchDate v-model="searchDate"></SearchDate>
            <SearchMonth v-model="searchMonth"></SearchMonth>
            <SearchYearVue v-model="searchYear"></SearchYearVue> 
        </div>
        <div class="search-item">
            <ExpensesAdd></ExpensesAdd>
        </div>
    </div>
    <el-table :data="filterTableData" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="date" sortable>
            <template #default="scope">
                {{ scope.row.date.split("T")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="费用名称" prop="name" />
        <el-table-column label="费用类别" prop="categoryName" />
        <el-table-column label="金额" prop="amount" sortable />
        <el-table-column label="备注" prop="remark" min-width="200" />
        <el-table-column align="center" fixed="right" label="操作" width="160">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="Edit" type="primary" size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" type="danger" size="small"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>

    <ExpensesEdit :id="id" ref="editChild"></ExpensesEdit>
</template>
  
<script setup>
import { computed, ref, onMounted,watch } from 'vue'
import { Edit, Delete } from "@element-plus/icons-vue";
import ExpensesAdd from './ExpensesAdd.vue';
import ExpensesEdit from './ExpensesEdit.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import SearchInputVue from '../../../../common/components/search/SearchInput.vue';
import dateUtil from '../../../../common/util/dateUtil';
import SearchDate  from '../../../../common/components/search/SearchDate.vue'
import SearchMonth from '../../../../common/components/search/SearchMonth.vue';
import SearchYearVue from '../../../../common/components/search/SearchYear.vue';

const tableData = ref([]);

const search = ref('')
const editChild = ref(null);

const searchDate = ref(dateUtil.getYMD(new Date()))
const searchMonth = ref(dateUtil.getYM(new Date()))
const searchYear = ref(dateUtil.getY(new Date()))

const filterTableData = computed(() => {
    let value = search.value;
    return tableData.value.filter(
        data => !search.value || data.name.includes(value)
    )
})


const id = ref("");

const handleEdit = (index, row) => {
    id.value = row.id;
    editChild.value.visible = true;
}


const handleDelete = (index, row) => {
    operation.handleDelete(function () {
        request.get(api.deletePayout, {
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

const getPayouts = function (type="month",date=searchMonth.value) {
    request.post(api.getPayouts,{
        shopId:localStorage.getItem("shopId"),
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
        getPayouts("date",newValue);
    }
    
})
watch(searchMonth,(newValue,oldValue)=>{
    if(newValue){
        getPayouts("month",newValue);
    }
   
})
watch(searchYear,(newValue,oldValue)=>{
    if(newValue){
        getPayouts("year",newValue);
    }
    
})

onMounted(() => {
    getPayouts();
})





</script>
  

<style scoped></style>


