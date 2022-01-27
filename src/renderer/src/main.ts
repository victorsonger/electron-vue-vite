import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading)

console.log('fs', window.fs)
console.log('ipcRenderer', window.ipcRenderer)
