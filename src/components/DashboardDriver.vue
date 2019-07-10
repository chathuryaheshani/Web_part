<template>
    <div id="dashboard"  style="margin-left:50px">
        <div v-if="driverProfile">
            <section>
                <div class="col1">
                    <div class="profile">
                        <div class="create-post">
                            <center>
                                <h2>Create a post</h2>
                            </center><br>
                            <form @submit.prevent>
                                <p>Title</p>
                                <input v-model.trim="postForm.title" type="text" id="title"
                                :class="{'err':$v.postForm.title.$invalid}">
                                <p>Message</p>
                                <textarea v-model.trim="postForm.msg" id="content"
                                :class="{'err':$v.postForm.msg.$invalid}"></textarea>
                                <button @click="addPost()" class="btn btn-primary align-middle" :disabled="$v.postForm.$invalid">
                                    <span v-if="performingRequest" class="spinner-border spinner-border-sm"></span>
                                    <span v-if="performingRequest">Posting</span>
                                    <span v-else>Post</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col2">
                    <div v-for="post in posts" class="profile" style="margin-bottom:10px">
                        <h2>{{ post.title }}</h2>
                        <small>{{ post.date }} at {{ post.time }}
                        by {{ post.name }} </br>
                        Route : {{ post.routenum }}
                        </small>
                        </br>
                    </br>
                    {{ post.msg }} </br>
                    </br>
                    
                    </div>
                </div>
            </section>
        </div>
        <div v-else style="margin:50px; text-align:center">
            <h2>Please add a vehicle first</h2>
        </div>
    </div>
</template>

<style>
    .err{
        border-left-color: crimson;
        border-left-width: 4px;
    }
</style>

<script>
    import Vuelidate from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    import { mapState } from 'vuex'
    const fb = require('../firebaseConfig.js')

    export default {
        data() {
            return {
                posts: [],
                postForm: {
                    title: '',
                    msg:''
                },
                performingRequest: false
            }
        },
        validations: {
            postForm: {
                title: {
                    required
                },
                msg: {
                    required
                }
            }
        },
        computed: {
            ...mapState(['userProfile','driverProfile','currentUser'])
        },
        methods: {
            addPost() {
                var dateFormat = require('dateformat')
                this.performingRequest = true;
                var d = new Date();
                fb.postsCollection.doc(this.driverProfile['route number']).collection(''+dateFormat(d,'mmmm dd, yyyy')).add({
                    date: ''+dateFormat(d,'mmmm dd, yyyy'),
                    email: this.currentUser.email,
                    msg: this.postForm.msg,
                    name: this.userProfile.fname,
                    routenum: this.driverProfile['route number'],
                    time: ''+dateFormat(d,'HH:MM'),
                    title: this.postForm.title
                }).then(ref => {
                    this.postForm.msg = ''
                    this.postForm.title = ''
                    this.getPosts()
                    this.performingRequest = false;
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false;
                })
            },
            getPosts() {
                this.posts = []
                var dateFormat = require('dateformat')
                console.log("log")
                for(var a=0;a<=6;a++){
                    var d = new Date();
                    console.log("log2")
                    d.setDate(d.getDate() - a); 
                    fb.postsCollection.doc(this.$store.state.driverProfile['route number']).collection(''+dateFormat(d,'mmmm dd, yyyy')).onSnapshot(res => {
                        res.forEach(doc=>{
                            if(doc.data().email){
                                this.posts.push(doc.data())
                                console.log(doc.data())
                            }
                        })
                    })
                }
            }
        },
        mounted() {
            this.getPosts()
        },
    }
</script>