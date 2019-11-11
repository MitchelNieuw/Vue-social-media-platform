import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// TODO make able to like messages and reactions
// TODO make view for liked messages and reactions
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
    },
    modules: {
    },
});

export default store;
