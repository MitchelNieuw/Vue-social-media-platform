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

    public getMessages(): Promise<AxiosResponse> {
        return axios.get(
            'https://localhost/api/v1/user/messages',
           this.config
        );
    }

    public storeMessage(formData: FormData): Promise<AxiosResponse> {
        return axios.post(
            'https://localhost/api/v1/user/messages/store',
            formData,
            this.config
        );
    }

    public deleteMessage(message: any): Promise<AxiosResponse> {
        return axios.delete(
            'https://localhost/api/v1/user/messages/' + message.id + '/delete',
            this.config
        );
    }
}

export const messageService = new MessageService();
