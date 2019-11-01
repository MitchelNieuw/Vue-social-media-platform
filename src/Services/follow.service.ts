import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';

class FollowService extends Vue {
    public async getFollowers(token: string, tag: string) {
        await axios.get('https://localhost/api/v1/user/' + tag + '/followers', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('followers', JSON.stringify(response.data.followers));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async getFollowing(token: string, tag: string) {
        await axios.get('https://localhost/api/v1/user/' + tag + '/following', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('following', JSON.stringify(response.data.following));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const followService = new FollowService();
