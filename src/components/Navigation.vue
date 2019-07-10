<style>
    @import 'https://use.fontawesome.com/releases/v5.7.1/css/all.css';
</style>

<template>
    <sidebar-menu v-if="userProfile.option==='Driver'" :menu="menu1" collapsed/>
    <sidebar-menu v-else :menu="menu2" collapsed  />
</template>

<script>
import Vuelidate from 'vuelidate'
import { required, minLength, email, helpers } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            menu1 : [
                {
                    header: true,
                    title: 'Neon - UoM'
                },
                {
                    href: '/home',
                    title: 'Home',
                    icon: 'fa fa-home'
                },
                {
                    href: '/dashboardDriver',
                    title: 'Driver\'s posts',
                    icon: 'fa fa-newspaper'
                },
                {
                    href: '/performanceViewer',
                    title: 'Performance',
                    icon: 'fa fa-thumbs-up'
                },
                {
                    href: '/feedbackViewer',
                    title: 'View Feedbacks',
                    icon: 'fa fa-envelope'
                },
                {
                    href: '/vehicle',
                    title: 'Vehicle',
                    icon: 'fa fa-car'
                },
                {
                    href: '/settings',
                    title: 'Settings',
                    icon: 'fa fa-user'
                },
                {
                    href: '/logout',
                    title: 'Logout',
                    icon: 'fa fa-power-off'
                }
            ],
            menu2 : [
                {
                    header: true,
                    title: 'Neon - UoM'
                },
                {
                    href: '/home',
                    title: 'Home',
                    icon: 'fa fa-home'
                },
                {
                    href: '/DashboardPassanger',
                    title: 'User Dashboard',
                    icon: 'fa fa-newspaper'
                },
                {
                    href: '/feedback',
                    title: 'Feedback',
                    icon: 'fa fa-envelope'
                },
                {
                    href: '/settings',
                    title: 'Settings',
                    icon: 'fa fa-user'
                },
                {
                    href: '/logout',
                    title: 'Logout',
                    icon: 'fa fa-power-off'
                }
            ]
        }    
    },
    computed: {
        ...mapState(['currentUser','userProfile'])
    }
}


</script>