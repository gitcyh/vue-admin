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
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { CaretBottom  } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import jwtUtil from "../../common/util/jwtUtil";
import PersonInfoVue from "./PersonInfo.vue";


const userName = ref("");
onMounted(()=>{
    userName.value = jwtUtil.decode().username;
})

</script>

<style scoped>
.userName{
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