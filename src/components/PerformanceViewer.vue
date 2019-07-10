<template>
  <div style="margin-left:50px; padding:0 10vh" class="col1">
    <img v-if="barChart" v-bind:src="barChart" class="img-fluid" style="width:100%"/>
    <br>
    <br>
    <br>
    <img v-if="pieChart" v-bind:src="pieChart" class="img-fluid" style="width:100%"/>
    <center>
    <span v-if="!pieChart && !barChart">No performance records found</span>
    </center>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            barChart: null,
            pieChart: null,
            barUrl: '',
            pirUrl: ''
        }
    },
    computed: {
        ...mapState(['userProfile','driverProfile','currentUser'])
    },
    methods: {
        getCharts() {
            fb.storage.refFromURL(this.barUrl).getDownloadURL().then(url=> {
                this.barChart = url;
                console.log(url)
            }).catch(err => {
                console.log(err)
            })

            fb.storage.refFromURL(this.barUrl).getDownloadURL().then(url=> {
                this.pieChart = url;
                console.log(url)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        fb.db.collection(this.currentUser.email).doc('performance').get().then(res=>{
            this.barUrl = res.data().barchart
            this.pieUrl = res.data().piechart

            this.getCharts()
        }).catch(err=>{
            console.log(err.message)
        })

        
    },
}
</script>