// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import App from './App'
import router from './router'
import { store } from './store.js'
import './assets/scss/app.scss'
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(Vuelidate)
Vue.use(VueSidebarMenu)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBueopmUrCdV7kB_H4oOXXIiO7fGtVLKLI',
    libraries: 'places'
  }
})

const fb = require('./firebaseConfig.js')

Vue.config.productionTip = false

/* eslint-disable no-new */
let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})
