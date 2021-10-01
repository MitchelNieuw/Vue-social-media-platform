<template>
    <modal :show="show" @close="close()">
        <div class="media">
            <img v-if="user" class="align-self-start mr-3 img-medium"
                 :src="'http://127.0.0.1:8000/' + user.profilePicture" :alt="user.name">
            <div class="media-body">
                <p v-if="user" class="font-weight-bold d-inline-block mr-2 mb-0" v-text="user.name"/>
                <router-link v-if="user" class="d-inline-block mr-2"
                             :to="'/user/' + user.tag" v-text="'@' + user.tag"/>
                <p class="text-muted d-inline-block mb-2 align-top" v-text="getDateFromNow(message.createdAt)"/>
                <p class="mb-4" v-text="message.content"/>
                <img v-if="message.image !== null" class="d-block img-fluid"
                     :src="'http://127.0.0.1:8000/messageImages/' + user.tag + '/' + message.image"
                     alt="Message image">

                <UserCreateReactions :message-id="message.id" :message-index="messageIndex"/>
                <ReactionMessage :message-id="message.id" :reactions="message.reactions"/>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Modal from '@/components/Modal.vue';
    import {dateTimeHelper} from '@/_core/helpers/date.helper';
    import ReactionMessage from '@/components/ReactionMessage.vue';
    import UserCreateReactions from '@/components/UserCreateReactions.vue';
    import {IMessage} from '@/_core/contracts/message.contract';
    import {IUser} from '@/_core/contracts/user.contract';
    import {IReaction} from '@/_core/contracts/reaction.contract';

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
        private message!: IMessage;

        @Prop({required: true})
        private messageIndex!: number;

        @Prop({default: {}})
        private user!: IUser;

        @Prop({default: () => []})
        public reactions!: Array<IReaction>;

        public getDateFromNow(date: string): string {
            return dateTimeHelper.getDateFromNow(date);
        }

        public close(): void {
            this.$emit('close');
        }
    }
</script>
