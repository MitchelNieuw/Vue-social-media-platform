import Vue from 'vue';

export default class ErrorHelper extends Vue {
    public static returnErrorMessage(error: any): string {
        console.log('error', error.response.data.message);
        return error.response.data.message;
    }
}
