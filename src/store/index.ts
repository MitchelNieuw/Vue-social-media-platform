import Vue from 'vue'
import Vuex from 'vuex'
import { messageService } from '@/Services/message.service';
import { notificationService } from '@/Services/notification.service';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        user: JSON.parse(<string>localStorage.getItem('user')),
        messages: JSON.parse(<string>localStorage.getItem('messages')),
        notifications: JSON.parse(<string>localStorage.getItem('notifications')),
        response: '',
    },
    getters: {
        jwtToken: state => {
            return state.user.jwtToken;
        },
        isLoggedIn: state => {
            return (state.isAuthenticated === 'true');
        },
    },
    mutations: {
        update_is_authenticated(state) {
            state.isAuthenticated = localStorage.getItem('isAuthenticated');
        },
        update_user(state) {
            state.user = JSON.parse(<string>localStorage.getItem('user'));
        },
        update_notifications(state) {
            state.notifications = JSON.parse(<string>localStorage.getItem('notifications'));
        },
        add_notification(state, data) {
            state.notifications.unshift(data);
        },
        remove_notification(state, index) {
            state.notifications.splice(index, 1);
        },
        update_messages(state) {
            state.messages = JSON.parse(<string>localStorage.getItem('messages'));
        },
        add_message(state, data) {
            state.messages.unshift(data);
        },
        remove_message(state, index) {
            state.messages.splice(index, 1);
        },
    },
    actions: {
        async getMessages({ getters, commit }) {
            await messageService.getMessages(getters.jwtToken);
            commit('update_messages');
        },
        async getNotifications({ getters, commit }) {
            await notificationService.getNotifications(getters.jwtToken);
            commit('update_notifications');
        }
    },
    modules: {
    },
});

export default store;
