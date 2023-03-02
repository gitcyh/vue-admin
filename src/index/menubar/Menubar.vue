<template>
  <el-menu active-text-color="#ffd04b" background-color="rgba(8, 49, 84, 0.9)" class="myMenu"
    :default-openeds="defaultOpeneds" :default-active="defaultActive" text-color="#fff" :collapse="isCollapse"
    @open="handleOpen" @close="handleClose">
    <template v-for="item in menuList" :key="item.value">
      <el-menu-item v-if="!item.children" :index="item.path" @click="goto(item)">
        <el-icon>
          <component :is="getIcon(item.icon)" />
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item.children" index="1">
        <template #title>
          <el-icon>
            <component :is="getIcon(item.icon)" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.value" :index="child.path" @click="goto(child)">
          <el-icon>
            <component :is="getIcon(child.icon)" />
          </el-icon>
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRouter } from "vue-router";
import { menuStore } from '../../store/menuStore';
import { List, Menu as IconMenu, Location, Setting, User, HomeFilled, House, Avatar, Memo, Files, GoodsFilled, Shop } from "@element-plus/icons-vue";


const router = useRouter();
const menuList = menuStore().$state.menuList;


const defaultActive = computed(() => menuStore().getCurrentMenu);
const icons = {
  List, IconMenu, Location, Setting, User, HomeFilled, House, Avatar, Memo, Memo, Files, GoodsFilled, Shop
}
const getIcon = function (key) {
  return icons[key]
}

defineProps({
  isCollapse: Boolean,

});

const defaultOpeneds = ["1"];

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const goto = (item) => {
  router.push({
    path: item.path,
  })
}


</script>

<style>
.myMenu:not(.el-menu--collapse) {
  overflow: hidden;
  width: 200px;
  min-height: 400px;
  height: 100%;
}
.el-menu{
  border-right:none;
}
</style>
