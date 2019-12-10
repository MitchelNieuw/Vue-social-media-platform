<template>
    <DashboardMessages :messages="this.messages"/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DashboardMessages from '@/components/DashboardMessages.vue';
    import {dashboardService} from '@/_core/services/dashboard.service';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import app from '../main';
    import {IMessage} from '@/_core/contracts/message.contract';

    @Component({
        components: {
            DashboardMessages,
        },
        async beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            await dashboardService.getDashboardMessages()
                .then((response) => {
                    next(vm => {
                        //@ts-ignore
                        vm.setMessages(response.data.data);
                    });
                }).catch((error) => {
                    const errorMessage = ErrorHelper.returnErrorMessage(error);
                    next(vm => {
                        //@ts-ignore
                        vm.setErrorResponse(errorMessage);
                    });
                });
            next();
        },
    })
    export default class Dashboard extends Vue {
        protected messages: Array<IMessage> = [];
        private errorResponse: string = '';

        protected setMessages(data: Array<IMessage>) {
            this.messages = data;
        }

        protected setErrorResponse(message: string) {
            this.errorResponse = message;
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }
    }
</script>
