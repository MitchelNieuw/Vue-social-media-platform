import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class UserService extends Vue {
    private config: object = {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwtToken,
            Accept: 'application/json',
        },
    };

    public async getDisplayUser(tag: string): Promise<AxiosResponse> {
        return await axios.get('https://localhost/api/v1/user/' + tag, this.config);
    }

    public async follow(tag: string): Promise<AxiosResponse> {
        return await axios.patch('https://localhost/api/v1/user/' + tag + '/follow', {}, this.config);
    }

    public async unFollow(tag: string): Promise<AxiosResponse> {
        return await axios.patch('https://localhost/api/v1/user/' + tag + '/unfollow', {}, this.config);
    }

    public async ban(tag: string): Promise<AxiosResponse> {
        return await axios.patch('https://localhost/api/v1/user/' + tag + '/ban', {}, this.config);
    }

    public async unBan(tag: string): Promise<AxiosResponse> {
        return await axios.patch('https://localhost/api/v1/user/' + tag + '/unban', {}, this.config);
    }

    public async turnOnNotifications(tag: string): Promise<AxiosResponse> {
        return await axios.patch(
            'https://localhost/api/v1/user/' + tag + '/notifications-on',
            {},
            this.config
        );
    }

    public async turnOffNotifications(tag: string): Promise<AxiosResponse> {
        return await axios.patch(
            'https://localhost/api/v1/user/' + tag + '/notifications-off',
            {},
            this.config
        );
    }
}

export const userService = new UserService();
