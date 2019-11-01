import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import ErrorHelper from '@/Helpers/error.helper';

class ReactionService extends Vue {
    public async storeReaction(formData: FormData, messageId: number, index: number, dashboardMessage: boolean = false) {
        await axios.post('https://localhost/api/v1/user/messages/' + messageId + '/reaction/store', formData, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            console.log(response.data);
            // TODO user object not correct
            if (dashboardMessage) {
                store.commit('update_dashboard_message_reactions', { data: response.data.data, index: index });
            } else {
                store.commit('update_user_message_reactions', { data: response.data.data, index: index });
            }
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public async deleteReaction(messageId: number, reactionId: number) {
        await axios.delete(
        'https://localhost/api/v1/user/messages/' + messageId + '/reaction/' + reactionId + '/delete', {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            console.log(response.data.data);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const reactionService = new ReactionService();
