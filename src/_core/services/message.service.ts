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
            'http://127.0.0.1:8000/api/v1/user/messages',
           await this.config
        );
    }

    public storeMessage(formData: FormData): Promise<AxiosResponse> {
        return axios.post(
            'http://127.0.0.1:8000/api/v1/user/messages/store',
            formData,
            this.config
        );
    }

    public deleteMessage(message: any): Promise<AxiosResponse> {
        return axios.delete(
            'http://127.0.0.1:8000/api/v1/user/messages/' + message.id + '/delete',
            this.config
        );
    }
}

export const messageService = new MessageService();
