<template>
  <el-menu active-text-color="#ffd04b"  background-color="#545c64" class="myMenu"  default-active="/index/myindex"  text-color="#fff"  :collapse="isCollapse"  @open="handleOpen"  @close="handleClose">
    <template v-for="item in menuList" :key="item.value">
      <el-menu-item v-if="!item.children" :index="item.path" @click="goto(item)">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{item.name}}</span>
      </el-menu-item>
      <el-sub-menu v-if="item.children">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.value" :index="child.path"  @click="goto(child)">
            <el-icon>
              <component :is="child.icon" />
            </el-icon>
            {{child.name}}
          </el-menu-item>
        </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import {defineProps} from 'vue'
import { useRouter } from "vue-router";
import {menuStore} from "../../store/menuStore";

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
.myMenu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
</style>
