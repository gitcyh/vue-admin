<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入类别名称" />
        </div>
        <div class="search-item">
            <CatAdd></CatAdd>
        </div>
    </div>
    <el-table :data="filterTableData" border style="width: 100%" row-key="name">
        <el-table-column label="序号" align="center" type="index" width="100" />
        <el-table-column label="类别名称"  prop="name" />
        <el-table-column label="二级标题" align="center" prop="subTitle" />
        <el-table-column label="级别" align="center" prop="level">
            <template #default="scope">
                {{ scope.row.level+"级分类" }}
            </template>
        </el-table-column>
        <el-table-column label="创建日期" align="center" prop="createTime" sortable width="180">
            <template #default="scope">
                {{ scope.row.createTime.split(" ")[0] }}
            </template>
        </el-table-column>
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
    <CatEdit :id="id" ref="editChild"></CatEdit>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import Operation from '../../../common/util/operation';
import CatAdd from './GoodsCatAdd.vue'
import CatEdit from './GoodsCatEdit.vue';
import request from '../../../request/request';
import api from '../../../request/api';

const search = ref('')
const editChild = ref(null);
const tableData = ref([]);

const finNode = function(data, value) {
    for(let i=0;i<data.length;i++){
        let item = data[i];
        if (item.name.includes(value) || item.subTitle?.includes(value)){
            return true;
        } 
        if (item.children) {
            return finNode(item.children, value);
        }
        return false
    }
}

const filterTableData = computed(() =>
    tableData.value.filter(data =>{
        if(!search.value){
            return true;
        }else{
            return  finNode([data],search.value);//data.name.includes(search.value) || data.subTitle?.includes(search.value)
        }
    })
)

const id = ref("");
const handleEdit = (index, row) => {
    id.value = row.id;
    editChild.value.visible = true;
}


const handleDelete = (index, row) => {
    Operation.handleDelete(function () {
        request.get(api.sysDeleteCategory,{
            params:{
                id:row.id,
            }
        }).then(res => {
            if (res.data.code === 200) {
                Operation.success("删除成功")
            } else {
                Operation.warning(res.data.msg)
            }
        })
    })
}

function dataToTree(parents, children) {
    parents.map(parent => {
        children.map((c, index) => {
            if (c.parentId === parent.id) {
                let _children = JSON.parse(JSON.stringify(children));
                _children.splice(index, 1);
                dataToTree([c],_children);
                if(parent.children){
                    parent.children.push(c);
                }else{
                    parent.children = [c];
                }
            }
        })
    })
}

const getCategoryList = function () {
    request.post(api.sysGetCategorys).then(res => {
        let list = res.data.data.data;
        let parents = list.filter(item => item.parentId === null);
        let children = list.filter(item => item.parentId !== null);
        dataToTree(parents,children)
        tableData.value = parents;
    })
}

onMounted(() => {
    getCategoryList();
})



</script>
  

<style scoped>

</style>


