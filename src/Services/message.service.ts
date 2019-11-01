import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
import store from '@/store/index';

class MessageService extends Vue {
    public async getMessages() {
        await axios.get('https://localhost/api/v1/user/messages', {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('messages', JSON.stringify(response.data.data));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public storeMessage(formData: FormData) {
        axios.post('https://localhost/api/v1/user/messages/store', formData, {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.commit('add_message', response.data.data);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public deleteMessage(message: any, index: any) {
        axios.delete('https://localhost/api/v1/user/messages/' + message.id + '/delete', {
            headers: {
                Authorization: 'Bearer ' + store.getters.jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('remove_message', index);
            store.dispatch('getMessages');
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const messageService = new MessageService();
