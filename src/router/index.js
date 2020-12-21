import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/film'
  },
  {
    path: '/film',
    name: 'Film',
    component: () => import('../views/Film.vue'),
    children: [
      {
        path: 'commingsoon', // 简写方式
        component: () => import('../views/film/Commingsoon.vue')
      },
      {
        path: '/film/nowplaying',
        component: () => import('../views/film/Nowplaying.vue')
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: () => import('../views/Cinema.vue')
  },
  {
    path: '/cinema/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/city',
    name: 'City',
    component: () => import('../views/City.vue')
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('../views/Center.vue')
  },
  {
    path: '/detail/:id', // 动态路由
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   // console.log(to);
//   const auth = ['/center', '/order', '/money', '/card']

//   if (auth.includes(to.fullPath)) {
//     // console.log('验证token');
//     if (!localStorage.getItem('mytoken')) {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
