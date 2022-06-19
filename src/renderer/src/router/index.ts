import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
const Home = () => import("../views/Home.vue");
const ComputedAndWatch = () => import("../views/ComputedAndWatch.vue");

const routes = [
  {
    path: "/",
    component: Home,
    name: 'Home',
    // 在electron嵌套路由不生效，具体原因未知 
    // 有人说可以用改成hash模式处理 
    // 但是试了还是不行
    // https://segmentfault.com/q/1010000007908270/a-1020000013519447
    // children: [
    //   {
    //     path: "computedAndWatch",
    //     component: ComputedAndWatch,
    //     // beforeEnter: (to, from, next) => {

    //     //   // ipcRenderer.send('changeWindowSize', {width: 1000, height: 563})
    //     //   console.log("进入主页");
    //     //   next();
    //     // },
    //   },
    // ],
  },
  {
    path: "/computedAndWatch",
    component: ComputedAndWatch,
    name: 'ComputedAndWatch',
    // beforeEnter: (_to, _from, next) => {
    //   ipcRenderer.send("changeWindowSize", { width: 1000, height: 563 });
    //   console.log("进入主页");
    //   next();
    // },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
