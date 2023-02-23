<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
        </div>
        <div class="search-item">
            <StaffAdd></StaffAdd>
        </div>
    </div>

    <el-table :data="filterTableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="性别" prop="sex">
            <template #default="scope">
                {{ scope.row.sex === 0 ? '男' : '女' }}
            </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age" />
        <el-table-column label="入职日期" prop="entryDate">
            <template #default="scope">
                {{ scope.row.entryDate.split(" ")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="身份证" prop="idCard" />
        <el-table-column label="住址" prop="address" min-width="200" />
        <el-table-column align="center" label="操作" width="220">
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
    <StaffEditVue ref="editChild" :id="id"></StaffEditVue>
    <StaffViewVue ref="viewChild" :data="data"></StaffViewVue>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { Delete, Edit, View } from "@element-plus/icons-vue";
import Operation from '../../../../common/util/operation';
import StaffAdd from './StaffAdd.vue'
import StaffEditVue from './StaffEdit.vue';
import StaffViewVue from './StaffView.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import SearchInputVue from '../../../../common/components/search/SearchInput.vue';


const tableData = ref([]);
const search = ref('')
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) => !search.value || data.name.includes(search.value) || data.phone.includes(search.value)
        || data.idCard.includes(search.value) || data.address.includes(search.value)
    )
)

const editChild = ref('');
const viewChild = ref('');
const data = ref({});
const id = ref("");

const handleEdit = (index, row) => {
    id.value = row.id;
    editChild.value.visible = true;
}

const handleView = (index, row) => {
    data.value = row;
    viewChild.value.visible = true;
}



const handleDelete = (index, row) => {
    Operation.handleDelete(function () {
        request.get(api.deleteStaff,{
            params:{
                id:row.id
            }
        }).then(res => {
        if (res.data.code === 200) {
            operation.success("修改成功");
        } else {
            operation.success("操作失败");
        }
    })
    })
}

const getStaffs = function () {
    request.post(api.getStaffs,{
        shopId:localStorage.getItem("shopId"),
    }).then(res => {
        tableData.value = res.data.data.data;
    })
}


onMounted(() => {
    getStaffs();
})
</script>
  

<style scoped>

</style>


