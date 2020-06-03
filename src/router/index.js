import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'login'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'login'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/category/create',
    name: 'CreateCategory',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateCategory.vue')
  },
  {
    path: '/todo/create',
    name: 'CreateTodo',
    meta: {
      layout: 'main',
      auth: true
    },
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateTodo.vue')
  },
  {
    path: '/todo/detail/:id',
    name: 'TodoDetail',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/TodoDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some((record) => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else if (!requireAuth && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
