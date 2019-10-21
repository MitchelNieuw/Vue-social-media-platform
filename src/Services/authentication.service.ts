import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
// @ts-ignore
import qs from 'querystring';

export default class AuthenticationService extends Vue {
    private config = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
    };

    public async login(email: string, password: string) {
        await axios.post('https://localhost/api/v1/login', qs.stringify({
                email: email,
                password: password,
            }), {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => {
                 this.setUserCookies(response);
            }).catch((error) => {
                ErrorHelper.returnErrorMessage(error);
            });
    }

    public register(username: string, email: string, password: string) {
        axios.post('https://localhost/api/v1/register', {
                username: username,
                email: email,
                password: password,
            }, this.config)
            .then((response) => {
                this.setUserCookies(response);
            }).catch((error) => {
                ErrorHelper.returnErrorMessage(error);
            });
    }

    public logout () {
        this.removeUserCookies();
    }

    private removeUserCookies() {
        this.$cookies.remove('user');
        this.$cookies.set('isAuthenticated', false);
    }

    private setUserCookies(response: any) {
        console.log('user', response.data.data);
        this.$cookies.set('user', JSON.stringify(response.data.data));
        this.$cookies.set('isAuthenticated', true);
    }
}

export const AuthService = new AuthenticationService();
