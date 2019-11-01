<template>
    <div id="app">
        <vue-progress-bar></vue-progress-bar>
        <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-blue shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="/">Social</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
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
                                                    v-text="this.$store.state.newNotifications"></span>
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
                        <li v-if="this.$store.getters.isLoggedIn" class="nav-item">
                            <img class="img-small img-profile d-inline-block"
                                 v-lazy="getImageUrl(this.$store.state.user.profilePicture)" alt="Profile picture">
                            <router-link class="nav-link d-inline-block" to="/user/profile" v-text="this.$store.state.user.name"
                            ></router-link>
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
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.25s ease-out;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { authenticationService } from '@/Services/authentication.service';
import { pusherService } from '@/Services/pusher.service';

// TODO make possible to give reaction on message
// TODO make possible to like message and a link to all liked messages
@Component({
    created() {
        this.$store.commit('update_user');
        if (this.$store.getters.isLoggedIn) {
            pusherService.pusher(this.$store.getters.jwtToken)
                .subscribe('private-App.User.' + this.$store.state.user.id)
                .bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
                this.$store.commit('add_notification', notification);
                this.$store.commit('update_new_notifications');
            });
        }
    }
})
export default class App extends Vue {
    public getImageUrl(image: string): string {
        return 'https://localhost/profilePictures/' + image;
    }

    public async logout () {
        if (this.$store.getters.isLoggedIn) {
            await authenticationService.logout();
            await this.$store.commit('update_is_authenticated');
            await this.$store.commit('update_user');
            await this.$store.commit('update_messages');
            await this.$store.commit('update_notifications');
            await this.$store.commit('update_display_user');
            await this.$store.commit('update_followers');
            await this.$store.commit('update_following');
            return this.$router.push({ name: 'home' });
        }
    }
}
</script>
