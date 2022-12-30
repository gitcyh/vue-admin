<template>
  <div class="index-wrap">
    <div class="index-left">
      <Menubar :isCollapse="isCollapse" />
    </div>
    <div class="index-right">
      <Header :isCollapse="isCollapse" @changeCollapse="changeCollapse" />
      <MenuNav />
      <div class="index-main">
        <router-view v-slot="{ Component }" name="main">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menubar from './menubar/Menubar.vue'
import Header from './header/Header.vue'
import MenuNav from './menuNav/MenuNav.vue'

const isCollapse = ref(false)

 function changeCollapse(value){
   isCollapse.value = !value
 }

</script>

<style  scoped>
  .index-wrap{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .index-left{
    width: auto;
    height: 100%;

  }
  .index-right{
    width: 100%;
  }
</style>>


