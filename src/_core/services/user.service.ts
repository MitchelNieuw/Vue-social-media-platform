import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class UserService extends Vue {
    private _config: object = {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwtToken,
            Accept: 'application/json',
        },
    };

    public getDisplayUser(tag: string): Promise<AxiosResponse> {
        return axios.get('http://127.0.0.1:8000/api/v1/user/' + tag, this._config);
    }

    public follow(tag: string): Promise<AxiosResponse> {
        return axios.patch('http://127.0.0.1:8000/api/v1/user/' + tag + '/follow', {}, this._config);
    }

    public unFollow(tag: string): Promise<AxiosResponse> {
        return axios.patch('http://127.0.0.1:8000/api/v1/user/' + tag + '/unfollow', {}, this._config);
    }

    public ban(tag: string): Promise<AxiosResponse> {
        return axios.patch('http://127.0.0.1:8000/api/v1/user/' + tag + '/ban', {}, this._config);
    }

    public unBan(tag: string): Promise<AxiosResponse> {
        return axios.patch('http://127.0.0.1:8000/api/v1/user/' + tag + '/unban', {}, this._config);
    }

    public async turnOnNotifications(tag: string): Promise<AxiosResponse> {
        return await axios.patch(
            'http://127.0.0.1:8000/api/v1/user/' + tag + '/notifications-on',
            {},
            this._config
        );
    }

    public turnOffNotifications(tag: string): Promise<AxiosResponse> {
        return axios.patch(
            'http://127.0.0.1:8000/api/v1/user/' + tag + '/notifications-off',
            {},
            this._config
        );
    }
}

export const userService = new UserService();
