import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path:'/',
    name:'default',
    redirect:{name:'home'}
  },
  {
    path:'/home',
    name:'home',
    component:() => import('@/views/Home.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
