<script setup lang="ts">
import { useUserStoreWithOut } from '../store/modules/user'

const user = useUserStoreWithOut()
</script>

<template>
  <div class="view-about">
    About component.
    <hr>
    <span>{{ user.name }}: {{ user.age }}</span>
  </div>
</template>

<style>
.view-about {
  font-size: 44px;
  text-align: center;
  padding: 44px 0;
}
</style>
