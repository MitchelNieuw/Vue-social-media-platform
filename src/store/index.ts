import Vue from 'vue'
import Vuex from 'vuex'
import { messageService } from '@/Services/message.service';
import { notificationService } from '@/Services/notification.service';
import { followService } from '@/Services/follow.service';
import { userService } from '@/Services/user.service';
import { dashboardService } from '@/Services/dashboard.service';
import { authenticationService } from '@/Services/authentication.service';

Vue.use(Vuex);

// TODO remove localstorage data and use data in components
// TODO make able to like messages and reactions
// TODO make view for liked messages and reactions
const store = new Vuex.Store({
    state: {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        user: JSON.parse(<string>localStorage.getItem('user')),
        messages: JSON.parse(<string>localStorage.getItem('messages')),
        dashboardMessages: JSON.parse(<string>localStorage.getItem('dashboardMessages')),
        notifications: JSON.parse(<string>localStorage.getItem('notifications')),
        followers: JSON.parse(<string>localStorage.getItem('followers')),
        following: JSON.parse(<string>localStorage.getItem('following')),
        displayUser: JSON.parse(<string>localStorage.getItem('displayUser')),
        response: '',
        errorResponse: '',
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
        update_dashboard_messages(state) {
            state.dashboardMessages = JSON.parse(<string>localStorage.getItem('dashboardMessages'));
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
        update_notifications(state) {
            state.notifications = JSON.parse(<string>localStorage.getItem('notifications'));
        },
        add_notification(state, data) {
            state.notifications.unshift(data);
        },
        remove_notification(state, index) {
            state.notifications.splice(index, 1);
        },
        update_followers(state) {
            state.followers = JSON.parse(<string>localStorage.getItem('followers'));
        },
        update_following(state) {
            state.following = JSON.parse(<string>localStorage.getItem('following'));
        },
        update_display_user(state) {
            state.displayUser = JSON.parse(<string>localStorage.getItem('displayUser'));
        },
        update_new_notifications(state) {
            state.newNotifications++;
        },
        clear_new_notifications(state) {
            state.newNotifications = 0;
        },
        update_display_user_follow(state, possible: boolean) {
            state.displayUser.possibleFollow = possible;
            state.displayUser.possibleUnFollow = !possible;
        },
        update_display_user_ban(state, possible: boolean) {
            state.displayUser.possibleBan = possible;
            state.displayUser.possibleUnBan = !possible;
            state.displayUser.possibleFollow = possible;
            state.displayUser.possibleTurnOnNotifications = possible;
        },
        update_display_user_notifications(state, possible: boolean) {
            state.displayUser.possibleTurnOnNotifications = possible;
            state.displayUser.possibleTurnOffNotifications = !possible;
        },
        update_display_user_increment_followers_count(state) {
            state.displayUser.followerCount++;
        },
        update_display_user_decrement_followers_count(state) {
            state.displayUser.followerCount--;
        },
        update_dashboard_message_reactions(state, payload) {
            state.dashboardMessages[payload.index].reactions.unshift(payload.data);
        },
        update_user_message_reactions(state, payload) {
            state.messages[payload.index].reactions.unshift(payload.data);
        },
    },
    actions: {
        async login({ commit }, payload) {
            await authenticationService.login(payload.email, payload.password);
            await commit('update_user');
            await commit('update_is_authenticated');
        },
        async getMessages({ commit }) {
            await messageService.getMessages();
            await commit('update_messages');
        },
        async getNotifications({ commit }) {
            await notificationService.getNotifications();
            await commit('update_notifications');
        },
        async getFollowers({ getters, commit }, tag: string) {
            await followService.getFollowers(getters.jwtToken, tag);
            await commit('update_followers');
        },
        async getFollowing({ getters, commit }, tag: string) {
            await followService.getFollowing(getters.jwtToken, tag);
            await commit('update_following');
        },
        async displayUser({ getters, commit }, tag) {
            await userService.getDisplayUser(getters.jwtToken, tag);
            await commit('update_display_user');
        },
        async getDashboardMessages({ getters, commit }) {
            await dashboardService.getDashboardMessages(getters.jwtToken);
            await commit('update_dashboard_messages');
        },
    },
    modules: {
    },
});

export default store;
