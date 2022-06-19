<template>
  <div class="route-nav" @click="goPage">
    > {{name || title}}
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
   props: {
    title: String,
    name: String,
    path: String,
    // query: Object,
  },
  setup(props) {
    const { path, name } = props;
    const router = useRouter()
    const route = useRoute()
    const goPage = () => {
      console.log('path', path);
      console.log('route.query---', route.query);
      console.log('route.params---', route.params);
      if (name) {
        router.push({ name, query: {
          ...route.query,
          // ...query
        }})
      } else if (path) {
        router.push({ path, query: {
          ...route.query,
          // ...query
        }})
      }
    }
    return {
      goPage
    }
  },
})
</script>

<style scoped lang="less">
  .route-nav {
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    color: red;
    padding-left: 30px;
  }
</style>