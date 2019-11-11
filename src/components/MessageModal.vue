<template>
    <modal :show="show" @close="close()">
        <div class="media">
            <img v-if="user" class="align-self-start mr-3 img-medium"
                 v-lazy="getImageUrl(user.profilePicture)" :alt="user.name">
            <div class="media-body">
                <p v-if="user" class="font-weight-bold d-inline-block mr-2 mb-0" v-text="user.name"></p>
                <router-link v-if="user" class="d-inline-block mr-2"
                             :to="'/user/' + user.tag" v-text="'@' + user.tag"></router-link>
                <p class="text-muted d-inline-block mb-2 align-top" v-text="getDateFromNow(message.createdAt)"></p>
                <p class="mb-4" v-text="message.content"></p>
                <img v-if="message.image !== null" class="d-block img-fluid"
                     v-lazy="getMessageImageUrl(message.image, user.tag)" alt="Message image">

                <UserCreateReactions :message-id="message.id" :message-index="messageIndex"
                ></UserCreateReactions>
                <ReactionMessage :message-id="message.id" :reactions="message.reactions"
                ></ReactionMessage>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Modal from '@/components/Modal.vue';
    import {dateTimeHelper} from '@/Helpers/date.helper';
    import ReactionMessage from '@/components/ReactionMessage.vue';
    import UserCreateReactions from '@/components/UserCreateReactions.vue';

    @Component({
        components: {
            Modal,
            ReactionMessage,
            UserCreateReactions,
        },
    })
    export default class MessageModal extends Vue {
        @Prop({default: false})
        private show!: boolean;

        @Prop({default: {}})
        private message!: object;

        @Prop({required: true})
        private messageIndex!: number;

        @Prop({default: {}})
        private user!: object;

        @Prop({default: () => []})
        public reactions!: [];

        public getDateFromNow(date: string): string {
            return dateTimeHelper.getDateFromNow(date);
        }

        public getImageUrl(image: string): string {
            return 'https://localhost/profilePictures/' + image;
        }

        public getMessageImageUrl(image: string, userTag: string): string {
            return 'https://localhost/messageImages/' + userTag + '/' + image;
        }

        public close(): void {
            this.$emit('close');
        }
    }
</script>
