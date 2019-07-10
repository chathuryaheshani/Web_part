import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import DashboardDriver from '@/components/DashboardDriver'
import Login from '@/components/Login'
import Settings from '@/components/Settings'
import DashboardPassanger from '@/components/DashboardPassanger'
import Feedback from '@/components/Feedback'
import FeedbackViewer from '@/components/FeedbackViewer'
import PerformanceViewer from '@/components/PerformanceViewer'
import Vehicle from '@/components/Vehicle'
import Home from '@/components/Home'
import Logout from '@/components/Logout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboardDriver',
      name: 'DashboardDriver',
      component: DashboardDriver,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboardPassanger',
      name: 'DashboardPassanger',
      component: DashboardPassanger,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/vehicle',
      name: 'Vehicle',
      component: Vehicle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/feedbackViewer',
      name: 'FeedbackViewer',
      component: FeedbackViewer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/performanceViewer',
      name: 'PerformanceViewer',
      component: PerformanceViewer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  var currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    if (currentUser.emailVerified) {
      next()
    } else {
      currentUser = null
      next('/login')
    }
  } else {
    next()
  }
})

export default router
