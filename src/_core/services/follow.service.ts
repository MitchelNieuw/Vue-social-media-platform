import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class FollowService extends Vue {
    private config: object = {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwtToken,
            Accept: 'application/json',
        },
    };

    public getFollowers(tag: string): Promise<AxiosResponse> {
        return axios.get(
            process.env.VUE_APP_API_URL + 'api/v1/user/' + tag + '/followers',
            this.config
        );
    }

    public getFollowing(tag: string): Promise<AxiosResponse> {
        return axios.get(
            process.env.VUE_APP_API_URL + 'api/v1/user/' + tag + '/following',
            this.config
        );
    }
}

export const followService = new FollowService();
