import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class MessageService extends Vue {
    private config: object = {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwtToken,
            Accept: 'application/json',
        },
    };

    public async getMessages(): Promise<AxiosResponse> {
        return await axios.get(
            process.env.VUE_APP_API_URL + 'api/v1/user/messages',
            await this.config
        );
    }

    public storeMessage(formData: FormData): Promise<AxiosResponse> {
        return axios.post(
            process.env.VUE_APP_API_URL + 'api/v1/user/messages/store',
            formData,
            this.config
        );
    }

    public deleteMessage(message: any): Promise<AxiosResponse> {
        return axios.delete(
            process.env.VUE_APP_API_URL + 'api/v1/user/messages/' + message.id + '/delete',
            this.config
        );
    }
}

export const messageService = new MessageService();
