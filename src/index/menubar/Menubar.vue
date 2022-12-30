<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="/index/myindex"
    text-color="#fff"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    style="height: 100%"
  >
    <template v-for="item in menuList" :key="item.value">
      <el-menu-item v-if="!item.children" :index="item.path" @click="goto(item)">
        <el-icon><icon-menu /></el-icon>
        <span>{{item.name}}</span>
      </el-menu-item>
      <el-sub-menu v-if="item.children">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.value" :index="child.path"  @click="goto(child)">{{child.name}}</el-menu-item>
        </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {menuStore} from "../../store/menuStore"
import { Document,  Menu as IconMenu, Location, Setting} from "@element-plus/icons-vue";

const router = useRouter();
const menuList = menuStore().$state.menuList;



defineProps({
  isCollapse: Boolean,

});

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const goto = (item)=>{
    router.push({
        path:item.path,

    })
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
