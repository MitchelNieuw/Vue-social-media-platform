<template>
    <div class="media-body">
        <p class="font-weight-bold d-inline-block mr-2 mb-0" v-text="message.user.name"></p>
        <router-link class="d-inline-block mr-2"
                     :to="'/user/' + message.user.tag" v-text="'@' + message.user.tag"></router-link>
        <p class="text-muted d-inline-block mb-0 align-top" v-text="getDateFromNow(message.createdAt)"></p>
        <p class="mb-0 d-block" v-text="message.content"></p>
        <img v-if="message.image !== null" class="d-block img-fluid"
             v-lazy="getMessageImageUrl(message.image, message.user.tag)" alt="Message image">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {dateTimeHelper} from '@/Helpers/date.helper';

    @Component
    export default class DashboardMessageMediaBody extends Vue {
        @Prop({default: {}})
        private message!: object;

        public getDateFromNow(date: string): string {
            return dateTimeHelper.getDateFromNow(date);
        }

        public getMessageImageUrl(image: string, userTag: string): string {
            return 'https://localhost/messageImages/' + userTag + '/' + image;
        }
    }
</script>
