<template>
  <div style="margin-left:50px; padding:0 10vh" class="col1">
    <br><h2>Update your vehicle details</h2><br>
    <form @submit.prevent>

    Number<br>
    <input v-model.trim="vehicleForm.vehicleNP" type="text" placeholder="XX-1234"
    @input="vehicleForm.vehicleNP = $event.target.value.toUpperCase()"
    :class="{'err':$v.vehicleForm.vehicleNP.$invalid}"/>

    Route<br>
    <input v-model.trim="vehicleForm.routeNo" type="text" placeholder="Route number"
    :class="{'err':$v.vehicleForm.routeNo.$invalid}"/>

    Seat Count<br>
    <input v-model.trim="vehicleForm.scount" type="text" placeholder="Number of seats"
    :class="{'err':$v.vehicleForm.scount.$invalid}"/>

    Name<br>
    <input v-model.trim="vehicleForm.vehicleName" type="text" placeholder="Nickname for vehicle"
    :class="{'err':$v.vehicleForm.vehicleName.$invalid}"/>

    <br>
    <button @click="addVehicle()" class="btn btn-primary btn-block" :disabled="$v.vehicleForm.$invalid">
            <span v-if="performingRequest" class="spinner-border spinner-border-sm"></span>
            <span v-if="performingRequest">Updating</span>
            <span v-else>Update</span>
        </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
import Vuelidate from 'vuelidate'
import { required, helpers,between } from 'vuelidate/lib/validators'
const _vehicleNo = helpers.regex('_vehicleNo',/[A-Z]{2}-[0-9]{4}/)
const _routeNo = helpers.regex('_routeNo',/[0-9]{0,3}/)
export default {
    data() {
        return {
            vehicleForm: this.$store.state.driverProfile ? {
                vehicleNP: this.$store.state.driverProfile['Vehicle NP'] ,
                routeNo: this.$store.state.driverProfile['route number'],
                scount: this.$store.state.driverProfile['scount'],
                vehicleName: this.$store.state.driverProfile['vehicle Name']
            } : {
                vehicleNP: '' ,
                routeNo: '',
                scount: '',
                vehicleName: ''
            }
        }
    },
    validations: {
        vehicleForm:{
            vehicleNP: {
                required,
                _vehicleNo
            },
            routeNo: {
                required,
                _routeNo
            },
            scount: {
                required,
                between: between(10,70)
            },
            vehicleName: {
                required
            }
        }
        
    },
    computed: {
        ...mapState(['userProfile','driverProfile','currentUser'])
    },
    methods: {
        addVehicle() {
            fb.db.collection(this.currentUser.email).doc('vehicleDetails').set({
                'Vehicle NP':this.vehicleForm.vehicleNP,
                'route number':this.vehicleForm.routeNo,
                'scount':this.vehicleForm.scount,
                'vehicle Name':this.vehicleForm.vehicleName
            }).then(ref => {
                this.$store.dispatch('fetchUserProfile')
                this.$router.push('/home')
            }).catch(err => {
                console.log(err)
            })
        },
        showDate() {
            console.log(new Date())
        }
    }
}
</script>