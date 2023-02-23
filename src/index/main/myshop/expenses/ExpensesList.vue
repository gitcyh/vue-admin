<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索</label>
            <el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入费用属性" />&nbsp;      
        </div>
        <!-- <div class="search-item">
            <el-date-picker v-model="date" type="date" label="请选择日期" placeholder="请选择日期" clearable />
        </div> -->
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
import { computed, ref, onMounted } from 'vue'
import { Edit, Delete, Search } from "@element-plus/icons-vue";
import ExpensesAdd from './ExpensesAdd.vue';
import ExpensesEdit from './ExpensesEdit.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import ExpenseCatSelect from '../../../../common/components/select/ExpenseCatSelect.vue';


const tableData = ref([]);

const search = ref('')
const editChild = ref(null);

const date = ref(new Date())

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

const getPayouts = function () {
    request.post(api.getPayouts).then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.data;
        }
    })
}

onMounted(() => {
    getPayouts();
})





</script>
  

<style scoped></style>


