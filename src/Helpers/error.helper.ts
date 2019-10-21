import Vue from 'vue';

export default class ErrorHelper extends Vue {
    public static returnErrorMessage(error: any) {
        console.log('error', error);
        return error.message;
    }
}
