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

    public async storeReaction(formData: FormData, messageId: number): Promise<AxiosResponse> {
        return await axios.post(
            'https://localhost/api/v1/user/messages/' + messageId + '/reaction/store', formData,
            this.config
        );
    }

    public async deleteReaction(messageId: number, reactionId: number): Promise<AxiosResponse> {
        return await axios.delete(
            'https://localhost/api/v1/user/messages/' + messageId + '/reaction/' + reactionId + '/delete',
            this.config
        );
    }
}

export const reactionService = new ReactionService();
