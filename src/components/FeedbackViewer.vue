<template>
  <div style="margin-left: 50px"  class="col1">
            <div class="profile">
                <span v-if="!isNaN(feedBacks[0])">Comfotability <br> <h2>{{ feedBacks[0] }} / 5</h2></span>
                <span v-else>No comfortability rating</span>
            </div>
            <div class="profile">
                <div v-if="!isNaN(feedBacks[1])">Clean <br> <h2>{{ feedBacks[1] }} / 5</h2></div>
                <div v-else>No Clean rating</div>
            </div>
            <div class="profile">
                <div v-if="!isNaN(feedBacks[2])">Friednly <br> <h2>{{ feedBacks[2] }} / 5</h2></div>
                <div v-else>No Friednly rating</div>
            </div>
            <div class="profile">
                <div v-if="!isNaN(feedBacks[3])">Safety <br> <h2>{{ feedBacks[3] }} / 5</h2></div>
                <div v-else>No Safety rating</div>
            </div>
            <div class="profile">
                <div v-if="!isNaN(feedBacks[4])">Quality <br> <h2>{{ feedBacks[4] }} / 5</h2></div>
                <div v-else>No Quality rating</div>
            </div>
  </div>
</template>

<style>
.profile {
    background-color: #fff;
    padding: 2rem; 
    margin: 10px;
}
</style>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
export default {
    data() {
        return {
            feedBacks: [],
            performingRequest: false,
            errorMsg: ''
        }
    },
    computed: {
        ...mapState(['userProfile','driverProfile','currentUser'])
    },
    methods: {
        updateUser() {
            
        }
    },
    mounted() {
        fb.feedbackCollection.doc(this.driverProfile['Vehicle NP']).get().then(res => {
            //this.feedBacks = res.data()
            // conf - clean - friend - safety - quality

            var count = [0,0,0,0,0]
            var rateSum = [0,0,0,0,0]
            for(var feed in res.data()){
                console.log(res.data()[feed]);
                var feedback = res.data()[feed]
                var tempRate = parseInt(feedback.charAt(0))
                if(feedback.includes('comportable')){
                    console.log("conf")
                    count[0]++
                    rateSum[0]+=tempRate
                }
                if(feedback.includes('clean')){
                    console.log("conf")
                    count[1]++
                    rateSum[1]+=tempRate
                }
                if(feedback.includes('friendly')){
                    console.log("conf")
                    count[2]++
                    rateSum[2]+=tempRate
                }
                if(feedback.includes('safety')){
                    console.log("conf")
                    count[3]++
                    rateSum[3]+=tempRate
                }
                if(feedback.includes('quality')){
                    console.log("conf")
                    count[4]++
                    rateSum[4]+=tempRate
                }
            }

            for(var a=0;a<5;a++){
                this.feedBacks.push(parseFloat(rateSum[a]/count[a]).toFixed(2));
            }

        }).catch(err => {
            console.log(err)
        })
    },
}
</script>