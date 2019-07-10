<template>
  <div id="app">
    <Navigation v-if="userProfile && $route.path!='/login'" style="z-index:10"></Navigation>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation.vue'
export default {
    components: { Navigation },
    computed: {
        ...mapState(['currentUser','userProfile'])
    }
}
</script>
