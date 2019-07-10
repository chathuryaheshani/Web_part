<template>
  <div style="margin-left: 50px; padding: 0 10vh"  class="col1">
    <form @submit.prevent>
        <br>
        <h1>Give feedback</h1>
        <br>
        <br>
        Vehicle Number <br>
        <input v-model.trim="vehicleNo" type="text" placeholder="XX-1234"
        @input="vehicleNo = $event.target.value.toUpperCase()"
        :class="{'err':$v.vehicleNo.$invalid}"/></br>

        Rating
        <div class="form-group">
        <select v-model.trim="rating" class="form-control" style="width:100%;">
            <option value="5">5</option>
            <option value="5">4</option>
            <option value="5">3</option>
            <option value="5">2</option>
            <option value="5">1</option>
        </select>
        </div>

        <input style="width:auto; display:inline" v-model.trim="conf" type="checkbox" name="Feed" value="comportable"> Comfortable</br>
        <input style="width:auto; display:inline" v-model.trim="clean" type="checkbox" name="Feed" value="clean" checked> Clean </br>
        <input style="width:auto; display:inline" v-model.trim="friend" type="checkbox" name="Feed" value="friendly"> Friendly</br>
        <input style="width:auto; display:inline" v-model.trim="safe" type="checkbox" name="Feed" value="safety" checked> Safe </br>
        <input style="width:auto; display:inline" v-model.trim="quality" type="checkbox" name="Feed" value="quality"> Quality</br>
        <button @click="addFeedback()" class="btn btn-primary btn-block" :disabled="$v.vehicleNo.$invalid">
            <span v-if="performingRequest" class="spinner-border spinner-border-sm"></span>
            <span v-if="performingRequest">Submitting</span>
            <span v-else>Submit</span>
        </button>
    </form>
  </div>
</template>

<style>
    .err{
        border-left-color: crimson;
        border-left-width: 4px;
    }
</style>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
import Vuelidate from 'vuelidate'
import { required, helpers } from 'vuelidate/lib/validators'
const _vehicleNo = helpers.regex('_vehicleNo',/[A-Z]{2}-[0-9]{4}/)
export default {
    data() {
        return {
            feedBacks: [],
            performingRequest: false,
            errorMsg: '',
            vehicleNo: '',
            conf: '',
            clean: '',
            friend: '',
            safe: '',
            quality: '',
            rating: '5',
            finstr:''
        }
    },
    validations: {
        vehicleNo: {
            required,
            _vehicleNo
        }
    },
    computed: {
        ...mapState(['userProfile','driverProfile','currentUser'])
    },
    methods: {
        addFeedback() {
            this.performingRequest = true
            var dateFormat = require('dateformat')
            var d = new Date();
            var one = false;
            var str = ''+this.rating+','
            if(this.conf){
                str+='comportable@'
            }
            if(this.clean){
                str+='clean@'
            }
            if(this.friend){
                str+='friendly@'
            }
            if(this.safe){
                str+='safety@'
            }
            if(this.quality){
                str+='quality@'
            }
            str = str.substring(0, str.length-1);
            this.finstr = ''+dateFormat(d,'yyyymmddHHMMss')
            fb.feedbackCollection.doc(this.vehicleNo).set({
                [this.finstr]: str
            },{ merge: true }).then(ref => {
                this.$router.push('/home')
            }).catch(err => {
                console.log(err)
                this.performingRequest = false
            })
            this.performingRequest = false
        }
    },
}
</script>