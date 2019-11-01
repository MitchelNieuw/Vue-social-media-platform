import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
import store from '@/store';

class UserService extends Vue {
    public async getDisplayUser(jwtToken: string, tag: string) {
        await axios.get('https://localhost/api/v1/user/' + tag, {
            headers: {
                Authorization: 'Bearer ' + jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('displayUser', JSON.stringify(response.data.data));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async follow(tag: string) {
        await axios.patch('https://localhost/api/v1/user/' + tag + '/follow', {}, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('update_display_user_follow', false);
            store.commit('update_display_user_increment_followers_count');
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async unFollow(tag: string) {
        await axios.patch('https://localhost/api/v1/user/' + tag + '/unfollow', {}, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('update_display_user_follow', true);
            store.commit('update_display_user_decrement_followers_count');
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async ban(tag: string) {
        await axios.patch('https://localhost/api/v1/user/' + tag + '/ban', {}, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('update_display_user_ban', false);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async unBan(tag: string) {
        await axios.patch('https://localhost/api/v1/user/' + tag + '/unban', {}, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('update_display_user_ban', true);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async turnOnNotifications(tag: string) {
        await axios.patch('https://localhost/api/v1/user/' + tag + '/notifications-on', {}, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('update_display_user_notifications', false);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async turnOffNotifications(tag: string) {
        await axios.patch('https://localhost/api/v1/user/' + tag + '/notifications-off', {}, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('update_display_user_notifications', true);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const userService = new UserService();
