<script setup lang="ts">

</script>

<template>
  <div class="nav-bar">
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav-bar a {
  padding: 4px 7px;
}

.router-link-exact-active {
  color: #fa6479;
}

</style>
