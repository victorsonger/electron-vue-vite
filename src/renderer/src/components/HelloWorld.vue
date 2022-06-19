<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{ msg: string }>();

let computedSwitch = true;

const count = ref(0)

const plusOne = computed(() => {
  console.log('计算属性')
  if (computedSwitch === true) {
    return count.value + 1
  } else {
    // 和vue2的计算属性一样 只要走到了这个分支，返回了一个不依赖任何响应式属性的值，之后就再也不会触发这个计算属性了
    return 10;

    // 实际 每次执行computed的时候，都会重新更新发布者列表
  }
});

const switchComputed = () => {
  computedSwitch = !computedSwitch;
}
</script>

<template>
 <div>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <p>
    <button @click="switchComputed">切换计算属性依赖</button>
  </p>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>computed 计算属性 plusOne为： {{ plusOne }}</p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
