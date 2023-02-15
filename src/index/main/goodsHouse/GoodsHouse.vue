<template>
    <div class="search-header">
        <div class="search-item">
            <label>搜索:</label><el-input :prefix-icon="Search" v-model="search" size="small" placeholder="请输入商品属性" />
        </div>
        <div class="search-item">
            <GoodsAdd></GoodsAdd>&nbsp;
            <BrandMgrVue></BrandMgrVue>
        </div>
    </div>
    <el-table :data="filterTableData" border style="width: 100%">
        <el-table-column label="序号" align="center" type="index" width="80" />
        <el-table-column label="日期" align="center" prop="createTime" sortable width="120">
            <template #default="scope">
                {{ scope.row.createTime.split("T")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="goodsName" />
        <el-table-column label="规格" align="center" prop="specs" />
        <el-table-column label="品牌名称" align="center" prop="brandName" />
        <el-table-column label="商品类别" align="center" prop="categoryName" />
        <el-table-column align="center" label="商品描述" prop="description" width="100">
            <template #default="scope">
                <EditorView :data="scope.row.goodsDesc"></EditorView>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" size="small" type="success"
                        @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <GoodsEditVue :id="id" ref="editChild"></GoodsEditVue>
    <GoodsViewVue :data="data" ref="viewChild"></GoodsViewVue>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import Operation from '../../../common/util/operation';
import GoodsAdd from './GoodsAdd.vue'
import GoodsEditVue from './GoodsEdit.vue';
import GoodsViewVue from './GoodsView.vue';
import BrandMgrVue from './BrandMgr.vue';
import EditorView from '../../../common/components/EditorView.vue';
import request from '../../../request/request';
import api from '../../../request/api';
import useGoods from './useGoods';

const search = ref('')
const editChild = ref(null);
const viewChild = ref(null);
const tableData = ref([]);

const filterTableData = computed(() =>
    tableData.value.filter(data =>{
        let value = search.value;
        if(!value){
            return true;
        }else{
            return data.goodsName.includes(value) || data.brandName.includes(value)
             || data.specs.includes(value) || data.goodsDesc.includes(value)
             || data.categoryName.includes(value)
        }
    })
)
const data = ref({});
const id = ref("");
const handleEdit = (index, row) => {
    editChild.value.visible = true;
    id.value = row.id;
}

const handleView = (index, row) => {
    viewChild.value.visible = true;
    useGoods.getGoods(row.id).then(res => {
        if (res.data.code == 200) {
            data.value = res.data.data.data;
        }
    })
}

const handleDelete = (index, row) => {
    Operation.handleDelete(function () {
        request.get(api.sysDeleteGoods,{
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



const getGoodsList = function () {
    request.post(api.sysGetGoodsList).then(res => {
        tableData.value = res.data.data.data;
    })
}

onMounted(() => {
    getGoodsList();
})



</script>
  

<style scoped>

</style>


