import Vue from 'vue';
import Pusher from 'pusher-js';

class PusherService extends Vue {
    public pusher(jwtToken: string) {
        Pusher.logToConsole = true;
        return new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
            cluster: 'eu',
            forceTLS: true,
            encrypted: true,
            authEndpoint: process.env.VUE_APP_AUTH_ENDPOINT,
            auth: {
                params: {},
                headers: {
                    Authorization: 'Bearer ' + jwtToken,
                    Accept: 'application/json',
                }
            },
        });

    }
}

export const pusherService = new PusherService();
