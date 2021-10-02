import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
// @ts-ignore
import qs from 'querystring';
import store from '@/store';

class AuthenticationService extends Vue {
    private config(contentType: string): object {
        return {
            header: {
                'Content-Type': contentType,
            },
        }
    }

    public login(email: string, password: string): Promise<AxiosResponse> {
        return axios.post(
            process.env.VUE_APP_API_URL + 'api/v1/login',
            qs.stringify({
                email: email,
                password: password,
            }),
            this.config('application/x-www-form-urlencoded')
        );
    }

    public register(formData: FormData): Promise<AxiosResponse> {
        return axios.post(
            process.env.VUE_APP_API_URL + 'api/v1/register',
            formData,
            this.config('multipart/form-data')
        );
    }

    public logout() {
        return axios.post(
            process.env.VUE_APP_API_URL + 'api/v1/logout',
            null,
            {
                headers: {
                    Authorization: 'Bearer ' + store.getters.jwtToken,
                    Accept: 'application/json',
                }
            }
        );
    }
}

export const authenticationService = new AuthenticationService();
