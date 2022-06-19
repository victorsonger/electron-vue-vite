<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '../components/HelloWorld.vue'
import ThemeControl from '../components/ThemeControl.vue';
import TestBlueTooth from '../components/TestBlueTooth.vue';
import {RouterView, RouterLink} from 'vue-router';

import RouteNav from '../components/RouteNav.vue'

</script>

<template>
  <div id="page">
    <div id="menu">
      <ThemeControl></ThemeControl>
      <RouteNav title="Home" path="/" />
      <RouteNav title="computedAndWatch" path="/computedAndWatch" />
    </div>
    <div id="page-main">
      <router-view></router-view>
    </div>
  </div>
<!-- https://github.com/vuejs/core/issues/1033#issuecomment-937643074 -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div class="static-public">
    Place static files into the <code>src/renderer/public</code> folder
    <img style="width:90px;" :src="'./images/node.png'" />
  </div> -->
    <!-- <TestBlueTooth></TestBlueTooth> -->
</template>

<style>
@media (prefers-color-scheme: dark) {
  :root {
    background: #d1d1d1;
    color: #fff;
  }
}

@media (prefers-color-scheme: light) {
    :root {
    background: #fff;
    color: #333;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#page {
  display: flex;

}
#menu {
  width: 30%;
  border-right: solid gray 2px;
}

#page-main {
  padding: 20px;
}

.logo-box {
  display: flex;
  width: 100%;
  justify-content: center;
  color: aqua;
}
#logo-box {
    background: #ff0000;
}

.logo-box span {
  width: 74px;
}

.static-public {
  display: flex;
  align-items: center;
  justify-content: center;
}

.static-public code {
  background-color: #eee;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
