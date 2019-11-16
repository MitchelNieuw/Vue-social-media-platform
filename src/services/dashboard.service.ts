import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class DashboardService extends Vue {
    public async getDashboardMessages(): Promise<AxiosResponse> {
        return axios.get('https://localhost/api/v1/user/dashboard', {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        });
    }
}

export const dashboardService = new DashboardService();
