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
    component:() => import('@/views/Home.vue'),
    redirect:{name:'accueil'},
    children:[
      {
        path:'/accueil',
        name:'accueil',
        component: () => import('@/views/accueil.vue')
      },
      {
        path:'/leaveMessage',
        name:'leaveMessage',
        component:() => import('@/views/leaveMessage.vue')
      }

    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
