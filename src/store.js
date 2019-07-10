import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')
    store.dispatch('fetchUserType')
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    driverProfile: {}
  },
  actions: {
    clearData ({commit}) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('setDriverProfile', {})
    },
    fetchUserProfile ({ commit, state }) {
      fb.db.collection(state.currentUser.email).doc('userDetails').get().then(res => {
        commit('setUserProfile', res.data())
        console.log('OPTION+=============>' + res.data().option)
        if (res.data().option === 'Driver') {
          this.dispatch('fetchDriverProfile')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchDriverProfile ({ commit, state }) {
      console.log('DISPATCHED DRIVER')
      fb.db.collection(state.currentUser.email).doc('vehicleDetails').get().then(res => {
        commit('setDriverProfile', res.data())
        console.log(res.data()['Vehicle NP'])
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    },
    setDriverProfile (state, val) {
      state.driverProfile = val
    }
  }
})
