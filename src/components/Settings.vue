<template>
  <div style="margin-left:50px; padding:0 10vh" class="col1">
    <br><h2>Update your account details</h2><br>
    <form @submit.prevent>

    <label for="fname">First Name</label>
    <input v-model.trim="userForm.fname" type="text" v-bind:placeholder="userProfile.fname" id="fname" 
    :class="{'err':$v.userForm.fname.$invalid}"/>

    <label for="lname">Last Name</label>
    <input v-model.trim="userForm.lname" type="text" v-bind:placeholder="userProfile.lname" id="lname" 
    :class="{'err':$v.userForm.lname.$invalid}"/>

    <label for="city">City</label>
    <input v-model.trim="userForm.city" type="text" v-bind:placeholder="userProfile.city" id="city" 
    :class="{'err':$v.userForm.city.$invalid}"/>

    <label for="phone">Mobile Number</label>
    <input v-model.trim="userForm.phone" type="text" v-bind:placeholder="userProfile.phone" id="phone"
    :class="{'err':$v.userForm.phone.$invalid}"/>

    <br>
    <button @click="updateUser()" class="btn btn-primary btn-block" :disabled="$v.userForm.$invalid">
        <span v-if="performingRequest" class="spinner-border spinner-border-sm"></span>
        <span v-if="performingRequest">Submitting</span>
        <span v-else>Submit</span>
    </button>
    </form>
    <transition name="fade">
        <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
        </div>
    </transition>
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
import { required, minLength, email, helpers } from 'vuelidate/lib/validators'
const _phone = helpers.regex('_phone',/[0-9]{10}/)
export default {
    data() {
        return {
            userForm: {
                fname: this.$store.state.userProfile.fname,
                lname: this.$store.state.userProfile.lname,
                phone: this.$store.state.userProfile.phone,
                city: this.$store.state.userProfile.city
            },
            performingRequest: false,
            errorMsg: ''
        }
    },
    validations: {
        userForm: {
            fname: {
                required
            },
            lname: {
                required
            },
            phone: {
                required,
                _phone
            },
            city: {
                required
            }
        }
    },
    computed: {
        ...mapState(['userProfile','driverProfile','currentUser'])
    },
    methods: {
        updateUser() {
            this.performingRequest = true
            if(this.userForm.fname==='' || this.userForm.lname==='' || this.userForm.phone===''|| this.userForm.city===''){
                this.errorMsg='Fill all fields'
                this.performingRequest = false
                return
              }
            fb.db.collection(this.currentUser.email).doc('userDetails').update({
                    fname: this.userForm.fname,
                    lname: this.userForm.lname,
                    phone: this.userForm.phone,
                    city: this.userForm.city
                }).then(() => {
                    this.$store.dispatch('fetchUserProfile')
                    this.$router.push('/home')
                }).catch(err => {
                    this.performingRequest = false
                    this.errorMsg = err.message
                    console.log(err)
                })
        },
        showDate() {
            console.log(new Date())
        },
        mounted() {
            this.userForm.fname = this.userProfile.fname
            this.userForm.lname = this.userProfile.lname
            this.userForm.city = this.userProfile.city
            this.userForm.phone = this.userProfile.phone
        },
    }
}
</script>