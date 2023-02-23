<template>
  <div class="header-wrap">
    <div class="header-collapse">
      <el-icon :isCollapse="isCollapse" @click="change(isCollapse)" size="24">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
    <Weather></Weather>
    <div class="header-name">
      店铺后台管理系统
    </div>
    <Clock></Clock>
    <MessageVue></MessageVue>
    <PersonVue></PersonVue>
    <div class="header-img">
       <el-image style="width: 40px; height: 40px" :src="src[0]" :zoom-rate="1.2" :preview-src-list="src" :initial-index="0" fit="cover"/>
    </div>
  </div>
</template>

<script setup>
import { Fold, Expand } from "@element-plus/icons-vue";
import PersonVue from "./Person.vue";
import MessageVue from './Message.vue';
import jwtUtil from "../../common/util/jwtUtil";
import Weather from "../../common/components/tool/Weather.vue";
import Clock from "../../common/components/tool/Clock.vue";

defineProps({
  isCollapse: Boolean,
  changeCollapse: Function,
});

const src = [jwtUtil.getPictureId()];


const emit = defineEmits(["changeCollapse"]);

function change(value) {
  emit("changeCollapse", value);
}
</script>

<style scoped>
.header-wrap {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color:  rgba(8, 49, 84, 0.9);
  color: #fff;
}
.header-collapse {
  width: 30px;
  cursor: pointer;
  margin-left: 5px;
}
.header-name {
  font-size: 22px;
  width: calc(100% - 800px);
  cursor: default;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.header-img {
  cursor: pointer;
  margin-right: 5px;
  margin-top: 4px;
}

.header-img .el-image{
  border-radius: 20px;
}
</style>


