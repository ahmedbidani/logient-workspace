import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/movies',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "about" */ '../views/Movies.vue'),
  },
  {
    path: '/movies/favorites',
    name: 'Favorites',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favorites.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/movies/:id',
    strict: true,
    name: 'MovieDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: { guest: true },
  },
  {
    path: '/',
    redirect: '/movies',
 }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
export default router