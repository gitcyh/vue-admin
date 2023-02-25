<template>
  <!-- 个人中心 -->
  <div class="header-person">
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <span :title="userName" class="userName">{{ userName }}</span>
        <el-icon class="el-icon--right">
          <CaretBottom />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><PersonInfoVue></PersonInfoVue></el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { CaretBottom } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import jwtUtil from "../../common/util/jwtUtil";
import PersonInfoVue from "./PersonInfo.vue";
import request from "../../request/request.js";
import api from "../../request/api.js";
import operation from "../../common/util/operation";
import { useRouter } from 'vue-router'



const router = useRouter();

const userName = ref("");

onMounted(() => {
  userName.value = jwtUtil.getValue("username");
});

const logout = function () {
  request.post(api.logout, {
      username: userName.value,
      id: jwtUtil.getValue("userid"),
    })
    .then((res) => {
      if (res.data.code === 200) {
        operation.success("退出成功!");
        localStorage.removeItem("role");
        localStorage.removeItem("shopId");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("pictureId");
        localStorage.removeItem("userid");
        router.push({
          name: "登录",
          path: "/login",
        });
      } else {
        operation.warning(res.data.msg);
      }
    });
};
</script>

<style scoped>
.userName {
  width: 50px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header-person {
  cursor: pointer;
  display: flex;
  width: 70px;
  margin-right: 10px;
}

.header-person .el-dropdown {
  color: #fff;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>