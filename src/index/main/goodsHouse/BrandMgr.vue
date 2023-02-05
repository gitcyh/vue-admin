<template>
  <div>
    <el-button type="success" size="small" @click="visible = true"
      >品牌管理</el-button
    >
    <el-dialog v-model="visible" :show-close="false" draggable title="品牌管理">
      <template #header="{ close, titleId, titleClass }">
        <div>
          <h6 :id="titleId" :class="titleClass">品牌管理</h6>
          <el-button @click="visible = false" :icon="CloseBold" circle />
        </div>
      </template>
      <div class="brand-add">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="品牌名称" prop="brand">
            <el-input v-model="ruleForm.brand" clearable />
          </el-form-item>
          <el-form-item class="brand-btn">
            <el-button @click="submitForm(ruleFormRef)" type="primary"
              >添加品牌</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="brand-list">
        <el-table :data="tableData" border max-height="600">
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column label="日期" prop="createTime" width="180" />
          <el-table-column label="品牌名称" prop="brand">
            <template #default="scope">
              <el-input
                v-if="currentId === scope.row.id"
                @blur="hideInput(scope.row)"
                size="mini"
                v-model="scope.row.brand"
              ></el-input>
              <span v-else>{{ scope.row.brand }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160">
            <template #default="scope">
              <el-button-group>
                <el-button
                  :icon="Edit"
                  type="primary"
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  :icon="Delete"
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CloseBold, Delete, Edit } from "@element-plus/icons-vue";
import operation from "../../../common/util/operation";
import requset from "../../../request/request";
import api from "../../../request/api";

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
  brand: "",
});
const currentId = ref("");

const tableData = ref([]);

const rules = reactive({
  brand: [
    {
      required: true,
      message: "请输入品牌名称",
      trigger: "blur",
    },
  ],
});

const hideInput = function (row) {
  requset
    .post(api.sysUpdateBrand, {
      id: row.id,
      brand: row.brand,
    })
    .then((res) => {
      if (res.data.code === 200) {
        operation.success("操作成功");
      }
    });
  currentId.value = "";
};

const handleEdit = function (index, row) {
  currentId.value = row.id;
};

const handleDelete = function (index, row) {
  operation.handleDelete(function () {
    console.log(index, row);
  });
};

const sysGetBrandList = function () {
  requset.post(api.sysGetBrandList).then((res) => {
    if (res.data.code === 200) {
      tableData.value = res.data.data.data;
    }
  });
};

watch(visible, (newValue, oldValue) => {
  if (newValue) {
    sysGetBrandList();
  }
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      requset
        .post(api.sysAddBrand, {
          brand: ruleForm.brand,
        })
        .then((res) => {
          sysGetBrandList();
          operation.success("品牌添加成功");
        });
    } else {
      operation.warning("请输入品牌名称");
    }
  });
};
</script>

<style scoped>
.brand-btn:deep().el-form-item__content {
  flex-direction: row-reverse;
}
</style>
