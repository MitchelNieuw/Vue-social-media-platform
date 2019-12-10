import Vue from 'vue';

export default class ErrorHelper extends Vue {
    public static returnErrorMessage(error: any): string {
        if (error.response.message !== undefined) {
            console.log('error', error.response.message);
            return error.response.message;
        }
        if (error.response.data !== undefined) {
            console.log('error', error.response.data.message);
            return error.response.data.message;
        }
        return 'Ooops something went wrong!';
    }
}
