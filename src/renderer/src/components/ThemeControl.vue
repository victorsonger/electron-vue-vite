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
  <p v-if="isSystem">当前正在使用系统主题</p>
  <div v-else>当前主题为： {{isDark ? '深色' : '浅色'}}</div>

  <ElButton @click="toggleTheme" type="primary"> 切换主题</ElButton>
  <ElButton @click="resetSystem" type="primary">重置为系统主题</ElButton>
  
</template>



<style lang="sass" scoped>
</style>