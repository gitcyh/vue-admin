<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入类别名称" />
        </div>
        <div class="search-item">
            <ExpenseCatAdd></ExpenseCatAdd>
        </div>
    </div>
    <el-table :data="filterTableData" border max-height="70vh">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column label="日期" prop="createTime" width="180">
            <template #default="scope">
                {{ scope.row.createTime.split(" ")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="类别名称" prop="name"/>
        <el-table-column label="描述" prop="description"/>
        <el-table-column align="center" label="操作" width="160">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="Edit" type="primary" size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <ExpenseCatEdit :id="id" ref="editChild"></ExpenseCatEdit>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { Search, Delete, Edit } from "@element-plus/icons-vue";
import operation from "../../../common/util/operation";
import requset from "../../../request/request";
import api from "../../../request/api";
import ExpenseCatAdd from './ExpenseCatAdd.vue'
import ExpenseCatEdit from "./ExpenseCatEdit.vue";


const search = ref('')
const tableData = ref([]);
const id = ref("");
const editChild = ref();

const filterTableData = computed(() =>
    tableData.value.filter(data =>{
        let value = search.value;
        if(!value){
            return true;
        }else{
            return data.name.includes(value) || data.description?.includes(value)
        }
    })
)

const handleEdit = function (index, row) {
    id.value = row.id;
    editChild.value.visible = true;
};

const handleDelete = function (index, row) {
    operation.handleDelete(() => {
        requset.get(api.sysDeleteExpenseCategory, {
           params:{
            id: row.id,
           }
        }).then(res => {
            if (res.data.code == 200) {
                sysGetExpenseCategorys();
                operation.success("操作成功");
            } else {
                operation.warning("操作失败");
            }
        })
    });
};

const sysGetExpenseCategorys = function () {
    requset.post(api.sysGetExpenseCategorys).then((res) => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.data;
        }
    });
};

onMounted(()=>{
    sysGetExpenseCategorys();
})


</script>

<style scoped>
</style>
