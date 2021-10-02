<template>
    <div id="app">
        <vue-progress-bar/>
        <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-blue shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="/">Social</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"/>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link text-blue" to="/">Home</router-link>
                        </li>
                        <li v-if="this.$store.getters.isLoggedIn" class="nav-item">
                            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                        </li>
                        <li v-if="this.$store.getters.isLoggedIn" class="nav-item">
                            <router-link class="nav-link" to="/user/notifications">
                                Notifications <span class="badge badge-light"
                                                    v-text="this.$store.state.newNotifications"/>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li v-if="!this.$store.getters.isLoggedIn" class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                        <li v-if="!this.$store.getters.isLoggedIn" class="nav-item">
                            <router-link class="nav-link" to="/register">Register</router-link>
                        </li>
                        <li v-if="this.$store.getters.isLoggedIn && this.$store.state.user !== undefined" class="nav-item">
                            <img class="img-small img-profile d-inline-block"
                                 :src="url + this.$store.state.user.profilePicture"
                                 alt="Profile picture">
                            <router-link class="nav-link d-inline-block" to="/user/profile"
                                         v-text="this.$store.state.user.name"/>
                        </li>
                        <li v-if="this.$store.getters.isLoggedIn" class="nav-item">
                            <a class="nav-link" @click="logout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="container py-5 text-white">
            <transition appear name="fade" mode="out-in">
                <router-view/>
            </transition>
        </main>
    </div>
</template>

<style>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 0.4s;
    }

    .fade-leave-active {
        transition: opacity 0.4s;
        opacity: 0;
    }
</style>


<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {authenticationService} from '@/_core/services/authentication.service';
    import store from '@/store';

    @Component({
        async created() {
            await store.commit('update_user');
            await store.dispatch('connect_to_pusher');
        }
    })
    export default class App extends Vue {
		protected url: string = process.env.VUE_APP_API_URL;

        public logout() {
            if (store.getters.isLoggedIn) {
                if (this.$router.currentRoute.name !== 'home') {
					this.$router.push({name: 'home'});
                }
				authenticationService.logout()
					.then((response) => {
						localStorage.removeItem('user');
						localStorage.setItem('isAuthenticated', 'false');
					}).catch((error) => {
						console.log(error.response);
				});
            }
        }
    }
</script>
