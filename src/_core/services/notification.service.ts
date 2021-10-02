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
            process.env.VUE_APP_API_URL + 'api/v1/user/notifications',
            this.config
        );
    }

    public deleteNotification(notification: any): Promise<AxiosResponse> {
        return axios.delete(
            process.env.VUE_APP_API_URL + 'api/v1/user/notifications/' + notification.id + '/delete',
            this.config
        );
    }
}

export const notificationService = new NotificationService();
