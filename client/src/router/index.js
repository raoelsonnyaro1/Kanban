import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { navbar: 'default' }
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingView,
    meta: { navbar: 'landing' }

  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    },
    meta: { navbar: 'loginNav' }
  },
  {
    path: '/account',
    name: 'account',
    // route level code-splitting
    // this generates a separate chunk (account.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "account" */ '../views/AccountView.vue')
    }
  },
  {
    path: '/departement',
    name: 'departement',
    // route level code-splitting
    // this generates a separate chunk (departement.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "departement" */ '../views/DepartementView.vue')
    }
  },
  {
    path: '/project',
    name: 'project',
    // route level code-splitting
    // this generates a separate chunk (project.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "project" */ '../views/ProjectView.vue')
    }
  },
  {
    path: '/project/:projectId',
    name: 'projectDetail',
    component: ProjectDetailView
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (user.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "user" */ '../views/UserView.vue')
    }
  },
  {
    path: '/client',
    name: 'client',
    // route level code-splitting
    // this generates a separate chunk (client.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "client" */ '../views/ClientView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
