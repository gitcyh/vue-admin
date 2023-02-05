<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入员工姓名" />
        </div>
        <div class="search-item">
            <StaffAdd></StaffAdd>
        </div>
    </div>
    
    <el-table :data="filterTableData" border  style="width: 100%">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="姓名" prop="name"  />
        <el-table-column label="性别" prop="sex" />
        <el-table-column label="年龄" prop="age" sortable />
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="身份证" prop="IDCard"  />
        <el-table-column label="住址" prop="address" min-width="200"  />
        <el-table-column align="right"  label="操作" >
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" type="success" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <StaffEditVue ref="editChild" :data="data"></StaffEditVue>
    <StaffViewVue ref="viewChild" :data="data"></StaffViewVue>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { Delete,  Edit,View,Search} from "@element-plus/icons-vue";
import Operation from '../../../../common/util/operation';
import StaffAdd from './StaffAdd.vue'
import StaffEditVue from './StaffEdit.vue';
import StaffViewVue from './StaffView.vue';

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

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
        name: '邓安义',
        sex:'男',
        age: '34',
        phone: '13712345678',
        IDCard:'360724***********',
        address: '新围仔',
    },
    {
        name: '邓安义',
        sex:'男',
        age: '34',
        phone: '13712345678',
        IDCard:'360724***********',
        address: '新围仔',
    },
    {
        name: '邓安义',
        sex:'男',
        age: '34',
        phone: '13712345678',
        IDCard:'360724***********',
        address: '新围仔',
    },
    {
        name: '邓安义',
        sex:'男',
        age: '34',
        phone: '13712345678',
        IDCard:'360724***********',
        address: '新围仔',
    },
]
</script>
  

<style scoped>
.search-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    margin: 2px;
}
.search-item label{
    width: 50px;
    display: inline-block;
    color: rgb(12, 138, 241);
    padding-left: 4px;
}
.search-header .el-input{
    width: 300px;
    height: 30px;
}
</style>


