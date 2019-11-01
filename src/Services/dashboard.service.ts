import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';

class DashboardService extends Vue{
    public async getDashboardMessages(jwtToken: string) {
        await axios.get('https://localhost/api/v1/user/dashboard',{
            headers: {
                Authorization: 'Bearer ' + jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('dashboardMessages', JSON.stringify(response.data.data));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const dashboardService = new DashboardService();
