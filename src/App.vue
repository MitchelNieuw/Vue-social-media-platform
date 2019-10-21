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
                        <li v-if="!this.isAuthenticated" class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                        <li v-if="!this.isAuthenticated" class="nav-item">
                            <router-link class="nav-link" to="/register">Register</router-link>
                        </li>
                        <li v-if="this.isAuthenticated" class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="notifications" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="true" v-pre>
                                Notifications <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="notificationsMenu" id="notificationsMenu">
                                <li v-if="this.notifications === []"
                                    class="dropdown-header border-bottom">
                                    No notifications yet.
                                </li>
                                <li v-for="(notification, index) in this.notifications" :key="index"
                                    class="dropdown-header border-bottom">
                                    <p class="mb-0" v-text="notification.message"></p>
                                    <a :href="notification.link" v-text="notification.link"></a>
                                </li>
                            </ul>
                        </li>
                        <li v-if="this.isAuthenticated" class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                               v-text="this.user.name">
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
import { AuthService } from '@/Services/authentication.service';
window.Pusher = require('pusher-js');
import Echo from 'laravel-echo';

@Component
export default class App extends Vue {
    private user: any = this.$cookies.get('user');
    protected notifications: [] = [];
    private isAuthenticated: boolean = (this.$cookies.get('isAuthenticated') === 'true');

    public async logout () {
        await AuthService.logout();
        localStorage.removeItem('messages');
        this.notifications = [];
        await this.$router.push({ name: 'home' });
    }

    public addNotification(data: never) {
        this.notifications.unshift(data);
    }

    public removeNotification(index: any) {
        this.notifications.splice(index, 1);
    }

    created() {
        if (this.isAuthenticated) {
            const newEcho = new Echo({
                broadcaster: 'pusher',
                key: process.env.VUE_APP_PUSHER_APP_KEY,
                cluster: 'eu',
                forceTLS: true,
                encrypted: true,
                authEndpoint: 'https://localhost/broadcasting/auth',
                auth: {
                    headers: {
                        Authorization: 'Bearer ' + this.user.jwtToken,
                        Accept: 'application/json',
                    }
                },
            });
            newEcho.private(`App.User.` + this.user.id)
                .notification((notification: any) => {
                    console.log('first', notification);
                    this.addNotification(notification);
            });
        }
    }
}
</script>
