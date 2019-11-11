<template>
    <ul class="list-unstyled col-md-6 mx-auto">
        <li class="media bg-dark p-4 mb-3" @click.stop="toggleModal(message.id)"
            v-for="(message, index) in messages" :key="index">
            <MessageModal :user-tag="userTag" :message-index="index" :user="message.user"
                          :message="message" :reactions="message.reactions"
                          :show="showModal(message.id)" @close="toggleModal(message.id)"/>
            <img class="align-self-start mr-3 img-medium" v-lazy="getImageUrl(message.user.profilePicture)"
                 :alt="message.user.name">
            <DashboardMessageMediaBody :message="message"></DashboardMessageMediaBody>
        </li>
    </ul>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import MessageModal from '@/components/MessageModal.vue';
    import DashboardMessageMediaBody from '@/components/DashboardMessageMediaBody.vue';
    import store from '@/store';

    @Component({
        components: {
            MessageModal,
            DashboardMessageMediaBody,
        },
        computed: {
            userTag(): string {
                return store.state.user.tag;
            },
        },
    })
    export default class DashboardMessages extends Vue {
        public activeModal: number = 0;

        @Prop()
        private messages!: [];

        public getImageUrl(image: string): string {
            return 'https://localhost/profilePictures/' + image;
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
    }
</script>
