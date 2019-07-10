<template>
    <div id="dashboard"  style="margin-left:50px">
        <section>
            <div class="col1">
                <div class="profile">
                    <div class="create-post">
                        <center>
                            <h2>Search for posts</h2>
                        </center><br>
                        <form @submit.prevent>
                            <div class="form-group">
                                Select Route <br>
                                <select v-if="routes.length > 0" v-model.trim="routenum" class="form-control" style="width:100%;">
                                    <option v-for="route in routes" v-bind:value="route">{{ route }}</option>
                                </select>
                                <div v-else class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                            <button @click="getPosts()" class="btn btn-primary btn-block">
                                <span v-if="performingRequest" class="spinner-border spinner-border-sm"></span>
                                <span v-if="performingRequest">Searching</span>
                                <span v-else>Search</span>
                            </button>
                            <span class="text-danger" v-if="errMsg">{{errMsg}}</span>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <center><div v-if="posts.length==0">Nothing found</div></center>
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
</template>

<script>
    import { mapState } from 'vuex'
    const fb = require('../firebaseConfig.js')

    export default {
        data() {
            return {
                posts: [],
                routenum:'',
                routes:[],
                performingRequest: false,
                errMsg: ''
            }
        },
        computed: {
            ...mapState(['userProfile','driverProfile','currentUser'])
        },
        methods: {
            getPosts() {
                this.performingRequest = true
                this.posts = []
                var dateFormat = require('dateformat')
                console.log("log")
                for(var a=0;a<=6;a++){
                    var d = new Date();
                    console.log("log2")
                    d.setDate(d.getDate() - a); 
                    fb.postsCollection.doc(this.routenum).collection(''+dateFormat(d,'mmmm dd, yyyy')).onSnapshot(res => {
                        res.forEach(doc=>{
                            if(doc.data().email){
                                this.posts.push(doc.data())
                                console.log(doc.data())
                            }
                        })
                    }
                    )
                }
                this.performingRequest = false
            },
            logger() {
                console.log(this.routenum)
            }
        },
        mounted() {
            fb.routesCollection.onSnapshot(res=>{
                res.forEach(route=>{
                    this.routes.push(route.id)
                })
                this.routenum = this.routes[0]
            })
        },
    }
</script>