<template>
    <div id="app">
        <nav id="nav" class="navbar navbar-expand-md navbar-dark bg-primary shadow-sm">
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
                            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li v-if="!this.$store.getters.isLoggedIn" class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                        <li v-if="!this.$store.getters.isLoggedIn" class="nav-item">
                            <router-link class="nav-link" to="/register">Register</router-link>
                        </li>
                        <li v-if="this.$store.getters.isLoggedIn" class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="notifications" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="true" v-pre>
                                Notifications <span class="caret"></span>
                            </a>
                            <ul v-if="this.$store.state.notifications !== undefined" class="dropdown-menu"
                                aria-labelledby="notificationsMenu" id="notificationsMenu">
                                <li v-if="this.$store.state.notifications === []" class="dropdown-header border-bottom">
                                    No notifications yet.
                                </li>
                                <li v-for="(notification, index) in this.$store.state.notifications" :key="index"
                                    class="dropdown-header border-bottom">
                                    <p class="mb-0" v-text="notification.data.message"></p>
                                    <a :href="notification.data.link" v-text="notification.data.link"></a>
                                </li>
                            </ul>
                        </li>
                        <li v-if="this.$store.getters.isLoggedIn" class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                               v-text="this.$store.state.user.name">
                                <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <router-link class="dropdown-item" to="/user/profile">Profile</router-link>
                                <router-link class="dropdown-item" to="/user/notifications">Notifications</router-link>
                                <a class="dropdown-item" @click="logout()">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="container py-5">
            <router-view/>
        </main>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { authenticationService } from '@/Services/authentication.service';
import { pusherService } from '@/Services/pusher.service';

@Component
export default class App extends Vue {
    public async logout () {
        if (this.$store.getters.isLoggedIn) {
            await authenticationService.logout();
            localStorage.removeItem('messages');
            localStorage.removeItem('notifications');
            localStorage.setItem('isAuthenticated', 'false');
            this.$store.commit('update_is_authenticated');
            this.$store.commit('update_user');
            this.$store.commit('update_messages');
            this.$store.commit('update_notifications');
            return this.$router.push({name: 'home'});
        }
    }

    created() {
        if (this.$store.getters.isLoggedIn) {
            let channel = pusherService.pusher(this.$store.getters.jwtToken)
                .subscribe('private-App.User.' + this.$store.state.user.id);
            channel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
                console.log('newNotification', notification);
                this.$store.commit('add_notification', notification);
            });
        }
    }
}
</script>
