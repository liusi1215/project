import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/home',
        redirect: "/home/persioninformation"
      },
      {
        path: '/home/teacherhome',
        component: () => import('../views/home/Teacherhome')
      },
      {
        path: '/home/scoremanger',
        component: () => import('../views/home/Scoremanger')
      },
      {
        path: '/home/studentmanger',
        component: () => import('../views/home/Studentmanger')
      },
      {
        path: '/home/persioninformation',
        component: () => import('../views/home/Persioninformation')
      },
      {
        path: '/home/studenthome',
        component: () => import('../views/home/Studenthome')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
