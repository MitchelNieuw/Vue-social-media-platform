<template>
    <ul class="list-unstyled" v-if="displayUser.possibleBan">
        <li class="media bg-dark p-4 mb-3" @click.stop="toggleModal(message.id)"
            v-for="(message, index) in displayUser.messages" :key="index">
            <MessageModal :user="displayUser" :message="message" :message-index="index"
                          :show="showModal(message.id)" @close="toggleModal(message.id)"/>
            <div class="media-body">
                <p class="text-muted d-inline-block mb-0 align-top" v-text="getDateFromNow(message.createdAt)"/>
                <p class="mb-0" v-text="message.content"/>
                <img v-if="message.image !== null" class="d-block img-fluid"
                     :src="'https://localhost/messageImages/' + message.image" alt="Message image">
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {dateTimeHelper} from '@/_core/helpers/date.helper';
    import MessageModal from '@/components/MessageModal.vue';
    import {IDisplayUser} from '@/_core/contracts/display-user.contract';

    @Component({
        components: {
            MessageModal,
        },
    })
    export default class DisplayUserMessages extends Vue {
        public activeModal: number = 0;

        @Prop({required: true})
        private displayUser!: IDisplayUser;

        @Prop({required: false})
        private id!: number;

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
