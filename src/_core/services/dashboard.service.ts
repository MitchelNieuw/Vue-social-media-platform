import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class DashboardService extends Vue {
    public getDashboardMessages(): Promise<AxiosResponse> {
        return axios.get(
            process.env.VUE_APP_API_URL + 'api/v1/user/dashboard', {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        });
    }
}

export const dashboardService = new DashboardService();
