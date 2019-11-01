<template>
    <div class="col-md-6 pt-3">
        <ul class="list-unstyled">
            <li class="media bg-dark p-4 mb-3" @click.stop="toggleModal(message.id)"
                v-for="(message, index) in this.$store.state.messages" :key="index">
                <MessageModal :user="user()" :message="message"
                              :show="showModal(message.id)" @close="toggleModal(message.id)"/>
                <div class="media-body">
                    <form class="d-inline-block float-right" @submit.prevent="deleteMessage(message, index)">
                        <button class="close text-danger pt-0" type="submit">
                            <span>&times;</span>
                        </button>
                    </form>
                    <p class="text-muted d-inline-block mb-0 align-top" v-text="getDateFromNow(message.createdAt)"></p>
                    <p class="mb-0" v-text="message.content"></p>
                    <img v-if="message.image !== null" class="d-block img-fluid" v-lazy="getImageUrl(message.image)"
                         alt="Message image">
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { messageService } from '@/Services/message.service';
import { dateTimeHelper } from '@/Helpers/dateTime.helper';
import MessageModal from '@/components/MessageModal.vue';
import store from '@/store';

@Component({
    components: {
        MessageModal,
    },
    props: ['id'],
    methods: {
        getDateFromNow(date: string) {
            return dateTimeHelper.getDateFromNow(date);
        },
    },
})
export default class UserMessages extends Vue {
    public activeModal: number = 0;
    private jwtToken: string = this.$store.getters.jwtToken;

    public user(): object {
        return store.state.user;
    }

    public getImageUrl(image: string): string {
        return 'https://localhost/messageImages/'+ this.$store.state.user.tag.replace('@', '') + '/' +image;
    }

    protected async deleteMessage(message: any, index: any) {
        await messageService.deleteMessage(message, index);
        await this.$store.dispatch('getMessages');
    }

    public showModal(id: number) {
        return this.activeModal === id;
    }

    public toggleModal(id: number) {
        if(this.activeModal !== 0) {
            this.activeModal = 0;
            return false;
        }
        this.activeModal = id;
    }

    async created() {
        await this.toggleModal(Number(this.$props.id));
    }
}
</script>
