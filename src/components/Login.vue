<template>
  <div id="login">
        <!--<transition name="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>-->
        <section>
            <div class="col1">
                <h1>Project Neon</h1>
                <p>
                    Welcome to the Sri Lankan transportation application
                    of next generation..!
                </p>
            </div>
            <div class="col2" :class="{ 'signup': !showLoginForm && !showForgotPassword }">
                <form v-if="showLoginForm" @submit.prevent>
                    <h1>Login</h1>

                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1"
                    :class="{'err':$v.loginForm.email.$invalid}"/>


                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" 
                    :class="{'err':$v.loginForm.password.$invalid}"/>
                    <div>
                        <button type="button" @click="login()" class="btn btn-primary align-middle" :disabled="$v.loginForm.$invalid">
                            <span v-if="performingRequest" class="spinner-border spinner-border-sm"></span>
                            <span v-if="performingRequest">Loading</span>
                            <span v-else>Login</span>
                        </button>

                        <div class="extras">
                            <a @click="togglePasswordReset">Forgot Password</a>
                            <a @click="toggleForm">Create an Account</a>
                        </div>
                    </div>
                </form>

                <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
                    <h1>Get Started</h1>
                    
                    <div class="form-group">
                        <label for="userRole">Role</label>
                        <select v-model.trim="signupForm.role" id="userRole" class="form-control">
                                <option value="Driver" selected>Driver</option>
                                <option value="Passenger">Passenger</option>
                            
                        </select>
                    </div>

                    <label for="fname">First Name</label>
                    <input v-model.trim="signupForm.fname" type="text" placeholder="First Name" id="fname" 
                    :class="{'err':$v.signupForm.fname.$invalid}"/>

                    <label for="lname">Last Name</label>
                    <input v-model.trim="signupForm.lname" type="text" placeholder="Last Name" id="lname" 
                    :class="{'err':$v.signupForm.lname.$invalid}"/>

                    <label>Gender</label>
                    <input v-model.trim="signupForm.gender" type="radio" name="gender" value="male" style="display:inline; width:auto" checked="checked"/> Male &nbsp;&nbsp; 
                    <input v-model.trim="signupForm.gender" type="radio" value="female" style="display:inline; width:auto"/> Female

                    <label for="city">City</label>
                    <input v-model.trim="signupForm.city" type="text" placeholder="City" id="city" 
                    :class="{'err':$v.signupForm.city.$invalid}"/>

                    <label for="phone">Mobile Number</label>
                    <input v-model.trim="signupForm.phone" type="text" placeholder="07*******" id="phone" 
                    :class="{'err':$v.signupForm.phone.$invalid}"/>

                    <label for="email2">Email</label>
                    <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" 
                    :class="{'err':$v.signupForm.email.$invalid}"/>

                    <label for="password2">Password</label>
                    <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" 
                    :class="{'err':$v.signupForm.password.$invalid}"/>

                    <button @click="signup" class="btn btn-primary align-middle" :disabled="$v.signupForm.$invalid">
                        <span v-if="performingRequest" class="spinner-border spinner-border-sm"></span>
                        <span v-if="performingRequest">Loading</span>
                        <span v-else>Signup</span>
                    </button>

                    <div class="extras">
                        <a @click="toggleForm">Back to Log In</a>
                    </div>
                </form>

                <form v-if="showForgotPassword" @submit.prevent class="password-reset">
                    <div v-if="!passwordResetSuccess">
                        <h1>Reset Password</h1>
                        <p>We will send you an email to reset your password</p>

                        <label for="email3">Email</label>
                        <input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" 
                        :class="{'err':$v.passwordForm.email.$invalid}"/>

                        <button @click="resetPassword" class="button">Submit</button>

                        <div class="extras">
                            <a @click="togglePasswordReset">Back to Log In</a>
                        </div>
                    </div>
                    <div v-else>
                        <h1>Email Sent</h1>
                        <p>check your email for a link to reset your password</p>
                        <button @click="togglePasswordReset" class="button">Back to login</button>
                    </div>
                </form>
                <transition name="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>

<style>
    .signup{
        padding-top: 5vh !important;
        height: auto !important;
    }
    .err{
        border-left-color: crimson;
        border-left-width: 4px;
    }
</style>

<script>
import Vuelidate from 'vuelidate'
import { required, minLength, email, helpers } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
const _phone = helpers.regex('_phone',/[0-9]{10}/)
const fb = require('../firebaseConfig.js')
export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            signupForm: {
                role: 'Driver',
                email: '',
                fname: '',
                lname: '',
                phone: '',
                city: '',
                gender: 'male',
                password: ''
            },
            passwordForm: {
                email: ''
            },
            showLoginForm: true,
            errorMsg: '',
            showForgotPassword: false,
            passwordResetSuccess: false,
            performingRequest: false
        }
    },
    validations: {
        loginForm:{
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            }
        },
        signupForm: {
            role: {
                required
            },
            email: {
                required,
                email
            },
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
            },
            gender: {
                required
            },
            password: {
                required,
                minLength: minLength(6)
            }
        },
        passwordForm: {
            email: {
                required,
                email
            }
        }
    },
    computed: {
        ...mapState(['currentUser'])
    },
    methods: {
        toggleForm() {
            this.errorMsg = ''
            this.showLoginForm = !this.showLoginForm
        },
        togglePasswordReset() {
            this.errorMsg = ''
            if (this.showForgotPassword) {
                this.showLoginForm = true
                this.showForgotPassword = false
                this.passwordResetSuccess = false
            } else {
                this.showLoginForm = false
                this.showForgotPassword = true
            }
        },
        login() {
            this.performingRequest = true;
            fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
                if(user.user.emailVerified){
                    console.log('email of user ====>' + user.user.email)
                    this.$store.commit('setCurrentUser', user.user)
                    this.$store.dispatch('fetchUserProfile')
                    this.$router.push('/home')
                }else{
                    this.$store.dispatch('clearData')
                    this.errorMsg = 'Please verify your email address'
                }
                this.performingRequest = false
            }).catch(err => {
                this.performingRequest = false
                this.errorMsg = err.message
                console.log(err)
            })
        },
        signup() {
            this.performingRequest = true;
            console.log(this.signupForm.role)
            console.log(this.signupForm.email)
            fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
                //this.$store.commit('setCurrentUser', user.user)
                user.user.sendEmailVerification()
                console.log(user.user.email)
                // create user obj
                fb.db.collection(user.user.email).doc('userDetails').set({
                    option: this.signupForm.role,
                    fname: this.signupForm.fname,
                    lname: this.signupForm.lname,
                    phone: this.signupForm.phone,
                    gender: this.signupForm.gender,
                    city: this.signupForm.city
                }).then(() => {
                    this.$router.push('/logout')
                }).catch(err => {
                    this.performingRequest = false
                    this.errorMsg = err.message
                    console.log(err)
                })
            }).catch(err => {
                this.performingRequest = false
                this.errorMsg = err.message
                console.log(err)
            })
        },
        resetPassword() {
            this.performingRequest = true

            fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
                this.performingRequest = false
                this.passwordResetSuccess = true
                this.passwordForm.email = ''
            }).catch(err => {
                console.log(err)
                this.performingRequest = false
                this.errorMsg = err.message
            })
        }
    },
    mounted() {
        if(this.$store.state.currentUser!=null){
            if(this.$store.state.currentUser.emailVerified){
                this.$router.push('/home');
            }else{
                this.$store.dispatch('clearData')
            }
        }
    },
}
</script>

