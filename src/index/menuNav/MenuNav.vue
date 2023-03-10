<template>
  <div class="menuNav-wrap">
      <el-tag :type="currentPath===tag.path ? 'success' : 'info'" v-for="tag in tags" :key="tag.name" class="menuNav-item"
       closable  @click="navto(tag)" @close="handleClose(tag)" effect="dark">{{ tag.name }}</el-tag>
  </div>
</template>


<script setup>  
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {menuStore} from "../../store/menuStore"

const router = useRouter();
const tags = computed(() => menuStore().getSelectedMenu)


const handleClose = (tag) => {
  if(tag.name === "首页"){
    return
  }
  let index = tags.value.indexOf(tag);
  menuStore().splice(index);
  router.push({
      name:"",
      path:tags.value[index-1].path,
  })
}

const navto = (tag)=>{
    router.push({
        name:"",
        path:tag.path,
    })
}
const currentPath = computed( ()=> menuStore().getCurrentMenu)
router.afterEach((to, from) => {
  menuStore().changeCurrentMenu(to.path);
})


</script>

<style scoped>
.menuNav-wrap{
  background: rgba(29,43,86,1);
  height: 30px;
  display: flex;
  align-items: center;
  overflow-y: auto;
}
.menuNav-item{
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>


