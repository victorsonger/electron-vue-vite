import { createApp } from "vue";
import router from "./router/index";

// 我们是按需引入elementUI组件，理论上不用全量引入这个样式文件
// 而是要在用到对应组件的地方去引入对应的css
// 不过为了方便这里就全量引入了
import "element-plus/dist/index.css";

import "../style/base.less";

import App from "./views/App.vue";

createApp(App).use(router).mount("#app").$nextTick(window.removeLoading);

console.log("fs", window.fs);
console.log("ipcRenderer", window.ipcRenderer);
