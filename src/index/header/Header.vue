<template>
  <div class="header-wrap">
    <div class="header-collapse">
      <el-icon :isCollapse="isCollapse" @click="change(isCollapse)" size="24">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
    <div class="header-name">
      老陈科技有限公司
    </div>
    <div class="header-message">
      <el-badge is-dot class="item">
        <el-icon size="24"><Bell /></el-icon>
      </el-badge>
    </div>
    <div class="header-person">
      <el-dropdown>
        <span class="el-dropdown-link">
          user-name
          <el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="header-img">
      <el-avatar
        :size="50"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { Fold, Expand, Bell,CaretBottom  } from "@element-plus/icons-vue";

defineProps({
  isCollapse: Boolean,
  changeCollapse: Function,
});

const emit = defineEmits(["changeCollapse"]);

function change(value) {
  console.log(value);
  emit("changeCollapse", value);
}
</script>

<style scoped>
.header-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #2e8bee;
  color: #fff;
}
.header-collapse {
  min-width: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;
}
.header-name {
  font-size: 20px;
  width: 80%;
  cursor: default;
  display: flex;
  justify-content: center;
}
.header-message {
  cursor: pointer;
  min-width: 20px;
}
.header-person {
  cursor: pointer;
  min-width: 100px;
}
.header-person .el-dropdown{
  color: #fff;
}
.header-img {
  cursor: pointer;
  margin-right: 5px;
  min-width: 50px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>


