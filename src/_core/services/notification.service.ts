import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class NotificationService extends Vue {
    private config: object = {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwtToken,
            Accept: 'application/json',
        },
    };

    public getNotifications(): Promise<AxiosResponse> {
        return axios.get(
            'http://127.0.0.1:8000/api/v1/user/notifications',
            this.config
        );
    }

    public deleteNotification(notification: any): Promise<AxiosResponse> {
        return axios.delete(
            'http://127.0.0.1:8000/api/v1/user/notifications/' + notification.id + '/delete',
            this.config
        );
    }
}

export const notificationService = new NotificationService();
