import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
import store from "@/store";

class NotificationService extends Vue {
    private API_URL = 'https://localhost/api/v1/';

    public getNotifications(token: string) {
        axios.get(this.API_URL + 'user/notifications', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('notifications', JSON.stringify(response.data.data));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public deleteNotification(notification: any, token: string) {
        axios.delete(this.API_URL + 'user/notifications/' + notification.id + '/delete', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                },
            }).then((response) => {
                store.state.response = response.data.message;
            }).catch((error) => {
                ErrorHelper.returnErrorMessage(error);
            });
    }
}

export const notificationService = new NotificationService();
