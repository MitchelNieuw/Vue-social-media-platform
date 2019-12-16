<template>
    <div class="media-body">
        <p class="font-weight-bold d-inline-block mr-2 mb-0" v-text="message.user.name"/>
        <router-link class="d-inline-block mr-2" :to="'/user/' + message.user.tag" v-text="'@' + message.user.tag"/>
        <p class="text-muted d-inline-block mb-0 align-top" v-text="getDateFromNow(message.createdAt)"/>
        <p class="mb-0 d-block" v-text="message.content"/>
        <img v-if="message.image !== null" class="d-block img-fluid"
             :src="'https://localhost/messageImages/' + message.user.tag + '/' + message.image" alt="Message image">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {dateTimeHelper} from '@/_core/helpers/date.helper';
    import {IMessage} from '@/_core/contracts/message.contract';

    @Component
    export default class DashboardMessageMediaBody extends Vue {
        @Prop({default: {}})
        private message!: IMessage;

        public getDateFromNow(date: string): string {
            return dateTimeHelper.getDateFromNow(date);
        }
    }
</script>
