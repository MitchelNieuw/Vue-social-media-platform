import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store/index';

class MessageService extends Vue {
    private config: object = {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwtToken,
            Accept: 'application/json',
        },
    };

    public async getMessages(): Promise<AxiosResponse> {
        return await axios.get(
            'https://localhost/api/v1/user/messages',
           this.config
        );
    }

    public async storeMessage(formData: FormData): Promise<AxiosResponse> {
        return await axios.post(
            'https://localhost/api/v1/user/messages/store',
            formData,
            this.config
        );
    }

    public async deleteMessage(message: any): Promise<AxiosResponse> {
        return await axios.delete(
            'https://localhost/api/v1/user/messages/' + message.id + '/delete',
            this.config
        );
    }
}

export const messageService = new MessageService();
