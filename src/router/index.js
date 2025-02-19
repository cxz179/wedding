import { createRouter,createWebHashHistory } from 'vue-router'
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
  history: createWebHashHistory(),
  routes: routes
})

export default router
