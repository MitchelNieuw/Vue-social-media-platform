import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
// @ts-ignore
import qs from 'querystring';

class AuthenticationService extends Vue {
    private config(contentType: string): object {
        return {
            header: {
                'Content-Type': contentType,
            },
        }
    }

    public async login(email: string, password: string) {
        await axios.post('https://localhost/api/v1/login', qs.stringify({
                email: email,
                password: password,
            }), this.config('application/x-www-form-urlencoded')
            ).then((response) => {
                AuthenticationService.setUserLocalStorageData(response);
            }).catch((error) => {
                ErrorHelper.returnErrorMessage(error);
            });
    }

    public register(formData: FormData) {
        axios.post('https://localhost/api/v1/register', formData, this.config('multipart/form-data')
            ).then((response) => {
                AuthenticationService.setUserLocalStorageData(response);
            }).catch((error) => {
                ErrorHelper.returnErrorMessage(error);
            });
    }

    public logout () {
        AuthenticationService.removeUserLocalStorageData();
    }

    private static removeUserLocalStorageData() {
        localStorage.removeItem('user');
        localStorage.removeItem('messages');
        localStorage.removeItem('notifications');
        localStorage.removeItem('displayUser');
        localStorage.removeItem('followers');
        localStorage.removeItem('following');
        localStorage.setItem('isAuthenticated', 'false');
    }

    private static setUserLocalStorageData(response: any) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        localStorage.setItem('isAuthenticated', 'true');
    }
}

export const authenticationService = new AuthenticationService();
