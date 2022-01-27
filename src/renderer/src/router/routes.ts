import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/about',
    component: () => import('../views/about.vue'),
  }
]

export default routes
