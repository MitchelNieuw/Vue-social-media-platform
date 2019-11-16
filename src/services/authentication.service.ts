import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
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

    public async login(email: string, password: string): Promise<AxiosResponse> {
        return await axios.post('https://localhost/api/v1/login',
            qs.stringify({
                email: email,
                password: password,
            }),
            this.config('application/x-www-form-urlencoded')
        );
    }

    public async register(formData: FormData): Promise<AxiosResponse> {
        return await axios.post(
            'https://localhost/api/v1/register',
            formData,
            this.config('multipart/form-data')
        );
    }

    public logout() {
        localStorage.removeItem('user');
        localStorage.setItem('isAuthenticated', 'false');
    }
}

export const authenticationService = new AuthenticationService();
