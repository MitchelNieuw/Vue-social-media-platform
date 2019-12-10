import Vue from 'vue';
import axios, {AxiosResponse} from 'axios';
import store from '@/store';

class ReactionService extends Vue {
    private config: object = {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwtToken,
            Accept: 'application/json',
        },
    };

    public storeReaction(formData: FormData, messageId: number): Promise<AxiosResponse> {
        return axios.post(
            'https://localhost/api/v1/user/messages/' + messageId + '/reaction/store', formData,
            this.config
        );
    }

    public deleteReaction(messageId: number, reactionId: number): Promise<AxiosResponse> {
        return axios.delete(
            'https://localhost/api/v1/user/messages/' + messageId + '/reaction/' + reactionId + '/delete',
            this.config
        );
    }
}

export const reactionService = new ReactionService();
