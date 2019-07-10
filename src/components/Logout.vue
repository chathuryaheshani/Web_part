<template>
  <div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
export default {
    mounted() {
        fb.auth.signOut().then(() => {
            this.$store.dispatch('clearData')
            this.$router.push('/login')
        }).catch(err => {
            console.log(err)
        })
    },
}
</script>