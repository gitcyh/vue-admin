<template>
    <div class="search-header">
        <div class="search-item">
            <SearchInputVue v-model="search"></SearchInputVue>
        </div>
        <div class="search-item">
            <GoodsAdd></GoodsAdd>
        </div>
    </div>
    <el-table :data="filterTableData" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="日期" prop="createTime" sortable>
            <template #default="scope">
                {{ scope.row.createTime.split("T")[0] }}
            </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName" min-width="200" />
        <el-table-column label="品牌名称" prop="brandName" />
        <el-table-column label="分类名称" prop="categoryName" />
        <el-table-column label="规格" prop="specs" />
        <el-table-column label="成本价" prop="costPrice" />
        <el-table-column label="配送价" prop="deliveryPrice" />
        <el-table-column label="自提价" prop="selfPrice" />
        <el-table-column label="审核状态" prop="goodStatus" sortable>
            <template #default="scope">
                {{ useGoods.getapplyState(scope.row.goodsStatus) }}
            </template>
        </el-table-column>
        <el-table-column label="是否上架" prop="isSale" sortable>
            <template #default="scope">
                {{ useGoods.getSaleState(scope.row.isSale) }}
            </template>
        </el-table-column>
        <el-table-column align="center" label="商品描述" prop="goodsdesc" width="100">
            <template #default="scope">
                <EditorView :data="scope.row.goodsDesc"></EditorView>
            </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="220">
            <template #default="scope">
                <el-button-group>
                    <el-button :icon="View" size="small" type="success"
                        @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button :icon="Edit" type="primary" size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :icon="Top" type="warning" size="small"
                        @click="handleShelf(scope.$index, scope.row)">{{ useGoods.getSaleOperation(scope.row.isSale) }}</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <GoodsEditVue :id="id" ref="editChild"></GoodsEditVue>
    <GoodsViewVue :data="data" ref="viewChild"></GoodsViewVue>
    <ShelfState :id="id" :isSale="isSale" ref="shelfChild"></ShelfState>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { Top, Edit, View } from "@element-plus/icons-vue";
import GoodsAdd from './GoodsAdd.vue'
import GoodsEditVue from './GoodsEdit.vue';
import GoodsViewVue from './GoodsView.vue';
import EditorView from '../../../../common/components/EditorView.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import useGoods from './useGoods';
import ShelfState from './ShelfState.vue';
import SearchInputVue from '../../../../common/components/search/SearchInput.vue';



const tableData = ref([])
const search = ref('')
const editChild = ref(null);
const viewChild = ref(null);
const shelfChild = ref();

const filterTableData = computed(() => {
    let value = search.value;
    return tableData.value.filter((data) => {
        return !value || data.goodsName.includes(value) ||  data.brandName.includes(value) ||  data.categoryName.includes(value)
            || data.goodsdesc.includes(value) ||  data.specs.includes(value)
    })
})



const id = ref('');
const data = ref({});
const isSale = ref(0);

const handleEdit = (index, row) => {
    id.value = row.id;
    editChild.value.visible = true;
}

const handleView = (index, row) => {
    viewChild.value.visible = true;
    data.value = row;
}


const handleShelf = (index, row) => {
    id.value = row.id;
    isSale.value = row.isSale;
    shelfChild.value.visible = true;
}


const getGoodsList = function () {
    request.post(api.getGoodsList,{
        shopId:localStorage.getItem("shopId")
    }).then(res => {
        tableData.value = res.data.data.data;
    })
}

onMounted(() => {
    getGoodsList();
})




</script>
  

<style scoped></style>


