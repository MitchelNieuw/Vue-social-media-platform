<template>
    <ul class="list-unstyled" v-if="displayUser.possibleBan">
        <li class="media bg-dark p-4 mb-3" @click.stop="toggleModal(message.id)"
            v-for="(message, index) in displayUser.messages" :key="index">
            <MessageModal :user="displayUser" :message="message" :message-index="index"
                          :show="showModal(message.id)" @close="toggleModal(message.id)"/>
            <div class="media-body">
                <p class="text-muted d-inline-block mb-0 align-top" v-text="getDateFromNow(message.createdAt)"></p>
                <p class="mb-0" v-text="message.content"></p>
                <img v-if="message.image !== null" class="d-block img-fluid" v-lazy="getImageUrl(message.image)"
                     alt="Message image">
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {dateTimeHelper} from '@/Helpers/date.helper';
    import MessageModal from '@/components/MessageModal.vue';

    @Component({
        components: {
            MessageModal,
        },
    })
    export default class DisplayUserMessages extends Vue {
        public activeModal: number = 0;

        @Prop({required: true})
        private displayUser!: object;

        @Prop({required: false})
        private id!: number;

        public getImageUrl(image: string): string {
            return 'https://localhost/messageImages/' + this.$props.displayUser.tag + '/' + image;
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
