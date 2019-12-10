import Vue from 'vue'
import Vuex from 'vuex'
import {pusherService} from '@/_core/services/pusher.service';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        user: JSON.parse(<string>localStorage.getItem('user')),
        newNotifications: 0,
    },
    getters: {
        jwtToken: state => {
            return state.user.jwtToken;
        },
        isLoggedIn: state => {
            return (state.isAuthenticated === 'true');
        },
        userCreatedAt: state => {
            return state.user.createdAt;
        },
    },
    mutations: {
        update_is_authenticated(state) {
            state.isAuthenticated = localStorage.getItem('isAuthenticated');
        },
        update_user(state) {
            state.user = JSON.parse(<string>localStorage.getItem('user'));
        },
        update_new_notifications(state) {
            state.newNotifications++;
        },
        clear_new_notifications(state) {
            state.newNotifications = 0;
        },
    },
    actions: {
        connect_to_pusher({ state, getters }) {
            if (getters.isLoggedIn) {
                pusherService.pusher(getters.jwtToken)
                    .subscribe('private-App.User.' + state.user.id)
                    .bind(process.env.VUE_APP_PUSHER_EVENTNAME, (notification) => {
                        console.log(notification);
                        store.commit('update_new_notifications');
                    });
            }
        }
    },
    modules: {
    },
});

export default store;
