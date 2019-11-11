import Vue from 'vue';
import {format, formatDistanceToNow} from 'date-fns';

class DateHelper extends Vue {
    public getDateFromNow(date: string): string {
        return formatDistanceToNow(new Date(date));
    }

    public filterDate(date: string): string {
        return format(new Date(date), 'do MMMM yyyy');
    }
}

export const dateTimeHelper = new DateHelper();
