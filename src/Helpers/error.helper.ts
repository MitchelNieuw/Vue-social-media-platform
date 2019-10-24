import Vue from 'vue';
import store from '@/store/index';

export default class ErrorHelper extends Vue {
    public static returnErrorMessage(error: any) {
        console.log('error', error.response.data.message);
        store.state.response = error.response.data.message;
    }
}
