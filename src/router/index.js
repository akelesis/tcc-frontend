import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '/dashboard/home',
        name: 'Home',
        component: () => import('../components/Home.vue')
      },
      {
        path: '/dashboard/rooms',
        name: 'Rooms',
        component: () => import('../components/Rooms.vue')
      },
      {
        path: '/dashboard/subjects',
        name: 'Subject',
        component: () => import('../components/Subjects.vue')
      },
      {
        path: '/dashboard/classes',
        name: 'Classes',
        component: () => import('../components/Classes.vue')
      },
      {
        path: '/dashboard/professors',
        name: 'Professors',
        component: () => import('../components/Professors.vue')
      },
      {
        path: '/dashboard/schedule',
        name: 'Schedule',
        component: () => import('../components/Schedule.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
