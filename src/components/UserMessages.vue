<template>
    <div class="col-md-6 pt-3">
        <transition-group appear name="fade" tag="ul" class="list-unstyled">
            <li class="media bg-dark p-4 mb-3" v-for="(message, index) in messages"
                :key="message.id">
                <MessageModal :user="user" :message="message" :message-index="index"
                              :show="showModal(message.id)" @close="toggleModal(message.id)"/>
                <div class="media-body" @click.stop="toggleModal(message.id)">
                    <form class="d-inline-block float-right" @submit.prevent="deleteMessage(message, index)">
                        <button class="close text-danger pt-0" type="submit">
                            <span>&times;</span>
                        </button>
                    </form>
                    <p class="text-muted d-inline-block mb-0 align-top" v-text="getDateFromNow(message.createdAt)"/>
                    <p class="mb-0" v-text="message.content"/>
                    <img v-if="message.image !== null" class="d-block img-fluid"
                         :src="'https://localhost/messageImages/' + user.tag.replace('@', '') + '/' + message.image"
                         alt="Message image">
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {messageService} from '@/_core/services/message.service';
    import {dateTimeHelper} from '@/_core/helpers/date.helper';
    import MessageModal from '@/components/MessageModal.vue';
    import store from '@/store';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import {IMessage} from '@/_core/contracts/message.contract';

    @Component({
        components: {
            MessageModal,
        },
        computed: {
            user() {
                return store.state.user;
            },
        },
    })
    export default class UserMessages extends Vue {
        public activeModal: number = 0;

        @Prop()
        private id!: number;

        @Prop({default: () => []})
        private messages!: Array<IMessage>;

        public getImageUrl(image: string): string {
            return 'https://localhost/messageImages/' + this.$store.state.user.tag.replace('@', '') + '/' + image;
        }

        protected async deleteMessage(message: any, index: any): Promise<void> {
            await messageService.deleteMessage(message)
                .then((response) => {
                    this.$parent.$data.response = response.data.message;
                    this.$parent.$data.messages.splice(index, 1);
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }

        public getDateFromNow(date: string): string {
            return dateTimeHelper.getDateFromNow(date);
        }

        public showModal(id: number): boolean {
            return this.activeModal === id;
        }

        public toggleModal(id: number) {
            if (this.activeModal !== 0) {
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
