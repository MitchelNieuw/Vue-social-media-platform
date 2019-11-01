import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
import store from "@/store";

class NotificationService extends Vue {
    public async getNotifications() {
        await axios.get('https://localhost/api/v1/user/notifications', {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('notifications', JSON.stringify(response.data.data));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public deleteNotification(notification: any, index: any) {
        axios.delete('https://localhost/api/v1/user/notifications/' + notification.id + '/delete', {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('remove_notification', index);
            store.dispatch('getNotifications');
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const notificationService = new NotificationService();
