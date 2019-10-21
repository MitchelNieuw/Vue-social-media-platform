import Vue from 'vue';
import axios from 'axios';
import ErrorHelper from '@/Helpers/error.helper';
import { updateBus } from '@/Events/updateMessageEvent';

class MessageService extends Vue {
    public getMessages(jwtToken: string|null): void {
        axios.get('https://localhost/api/v1/user/messages', {
            headers: {
                Authorization: 'Bearer ' + jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            console.log('getMessages', response.data.data);
            localStorage.setItem('messages', JSON.stringify(response.data.data));
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public storeMessage(content: string, jwtToken: string|null) {
        axios.post('https://localhost/api/v1/user/messages/store', { 'content': content }, {
            headers: {
                Authorization: 'Bearer ' + jwtToken,
                Accept: 'application/json',
            },
        }).then((response) => {
            console.log(response.data);
            updateBus.$emit('add-message', response.data);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }

    public deleteMessage(message: any, index: any, jwtToken: string|null) {
        axios.delete('https://localhost/api/v1/message/' + message.id + '/delete', {
            headers: {
                Authorization: 'Bearer ' + jwtToken,
                Accept: 'application/json',
                'Content-type': 'application/x-www-form-urlencoded',
            },
            method: 'delete',
        }).then((response) => {
            console.log(response.data);
            updateBus.$emit('update-messages', index);
        }).catch((error) => {
            ErrorHelper.returnErrorMessage(error);
        });
    }
}

export const messageService = new MessageService();
