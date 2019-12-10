<template>
    <div>
        <div class="row">
            <div v-if="this.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <p v-text="this.errorResponse"/>
            </div>
            <div v-if="this.response !== ''" class="mx-auto alert alert-dismissible alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <p v-text="this.response"/>
            </div>
        </div>
        <div class="row">
            <UserInfo/>
            <CreateMessage/>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <UserMessages :id="id" :messages="this.messages"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import CreateMessage from '@/components/CreateMessage.vue';
    import UserMessages from '@/components/UserMessages.vue';
    import UserInfo from '@/components/UserInfo.vue';
    import app from '../main';
    import {messageService} from '@/_core/services/message.service';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import {IMessage} from '@/_core/contracts/message.contract';

    @Component({
        components: {
            CreateMessage,
            UserMessages,
            UserInfo,
        },
        async beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            await messageService.getMessages()
                .then((response) => {
                    next(vm => {
                        // @ts-ignore
                        vm.setMessages(response.data.data);
                    });
                }).catch((error) => {
                    const errorMessage = ErrorHelper.returnErrorMessage(error);
                    console.log(errorMessage);
                    next(vm => {
                        // @ts-ignore
                        vm.setErrorResponse(errorMessage);
                    });
                });
            next();
        },
    })

    export default class UserProfile extends Vue {
        protected messages: Array<IMessage> = [];
        private errorResponse: string = '';
        private response: string = '';

        @Prop()
        private tag!: string;

        @Prop()
        private id!: number;

        public setMessages(messages: []) {
            this.messages = messages;
        }

        public setErrorResponse(message: string) {
            this.errorResponse = message;
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }

        beforeDestroy() {
            this.errorResponse = '';
            this.response = '';
        }
    }
</script>
