<template>
  <div style="margin-left:50px;">
    <!--<center>
        <img src="../assets/back2.jpg" style="width:100%; height:100vh; object-fit:cover;">
    </center>-->
    <GmapMap
    :center="{lat:7.8731,lng:80.7718}"
    :zoom="8"
    map-type-id="terrain"
    style="width: 100%; height: 100vh;z-index:5; position:relative"
    >
    </GmapMap>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
export default {
    computed: {
        ...mapState(['currentUser','userProfile'])
    },
    methods: {
        logout() {
            fb.auth.signOut().then(() => {
                this.$store.dispatch('clearData')
                this.$router.push('/login')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>