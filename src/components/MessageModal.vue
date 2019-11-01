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

                <UserCreateReactions :message-id="message.id" :message-index="messageIndex"></UserCreateReactions>
                <ReactionMessage :message-id="message.id" :user-tag="userTag" :reactions="message.reactions"
                ></ReactionMessage>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import { dateTimeHelper } from '@/Helpers/dateTime.helper';
import ReactionMessage from '@/components/ReactionMessage.vue';
import UserCreateReactions from '@/components/UserCreateReactions.vue';

@Component({
    components: {
        Modal,
        ReactionMessage,
        UserCreateReactions,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        message: {
            type: Object,
            default: {},
        },
        messageIndex: {
            required: true,
            type: Number,
        },
        user: {
            type: Object,
            default: {},
        },
        userTag: {
            required: true,
            type: String,
        },
        reactions: {
            type: Array,
            default: () => { return [] },
        },
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
})
export default class MessageModal extends Vue {
    public getDateFromNow(date: string) {
        return dateTimeHelper.getDateFromNow(date);
    }

    public getImageUrl(image: string): string {
        return 'https://localhost/profilePictures/' + image;
    }

    public getMessageImageUrl(image: string, userTag: string): string {
        return 'https://localhost/messageImages/' + userTag + '/' + image;
    }
}
</script>
