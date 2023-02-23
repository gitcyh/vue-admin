<template>
  <el-menu active-text-color="#ffd04b" background-color="rgba(8, 49, 84, 0.9)" class="myMenu"
    :default-active="defaultActive" text-color="#fff" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <template v-for="item in menuList" :key="item.value">
      <el-menu-item v-if="!item.children" :index="item.path" @click="goto(item)">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item.children">
        <template #title>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.value" :index="child.path" @click="goto(child)">
          <el-icon>
            <component :is="child.icon" />
          </el-icon>
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import { defineProps, onMounted, ref, computed } from 'vue'
import { useRouter } from "vue-router";
import jwtUtil from '../../common/util/jwtUtil';
import { menuStore, userMenu, adminMenu } from '../../store/menuStore';

const router = useRouter();
const menuList = ref([]);

const defaultActive = computed(() => menuStore().getCurrentMenu);

defineProps({
  isCollapse: Boolean,

});

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

onMounted(() => {
  const store = menuStore();
  let role = jwtUtil.getValue('role');
  if (role === 1111) {
    store.changeState(userMenu);
    menuList.value = store.$state.menuList;
  } else if (role === 9999) {
    store.changeState(adminMenu);
    menuList.value = store.$state.menuList;
  }

})
</script>

<style>
.myMenu:not(.el-menu--collapse) {
  overflow: hidden;
  width: 200px;
  min-height: 400px;
  height: 100%;
}
</style>
