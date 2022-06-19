<script setup lang="ts">

import {ref, watchEffect} from 'vue';
import {toggleThemeMode, resetToSystemTheme} from '@/utils';
import { usePreferredDark } from '@vueuse/core'

import { ElButton } from 'element-plus'

const isDark = usePreferredDark();
const isSystem = ref(false);


watchEffect(() => {
  console.log('isDark---', isDark.value);
})

/**
 * 切换主题  返回一个布尔值代表切换后的主题色  true：深色  false： 浅色
 */
const toggleTheme = async () => {
  isSystem.value = false;
  await toggleThemeMode();
}

/**
 * 重置为系统主题
 */
const resetSystem = async () => {
  await resetToSystemTheme();
  isSystem.value = true;
}

</script>

<template>
<div id="theme-control">
  <ElButton @click="toggleTheme" type="primary"> 切换{{isDark ? '浅色' : '深色'}}主题</ElButton>
  <ElButton @click="resetSystem" type="primary">重置为系统主题</ElButton>
</div>
</template>



<style lang="less" scoped>
  #theme-control {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 30px;
    .el-button {
      margin-bottom: 15px;
      margin-left: 0;
    }
  }
</style>