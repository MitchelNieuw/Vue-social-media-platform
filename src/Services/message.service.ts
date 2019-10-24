import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
import store from "@/store";

class MessageService extends Vue {
    public getMessages(token: string): void {
        axios.get('https://localhost/api/v1/user/messages', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        }).then((response) => {
            localStorage.setItem('messages', JSON.stringify(response.data.data));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public storeMessage(content: string, token: string) {
        axios.post('https://localhost/api/v1/user/messages/store', { 'content': content }, {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('add_message', response.data.data);
            store.dispatch('getMessages');
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public deleteMessage(message: any, token: string) {
        axios.delete('https://localhost/api/v1/message/' + message.id + '/delete', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            store.state.response = response.data.message;
            store.commit('remove_message');
            store.dispatch('getMessages');
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const messageService = new MessageService();
