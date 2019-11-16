<template>
    <DashboardMessages :messages="this.messages"></DashboardMessages>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DashboardMessages from '@/components/DashboardMessages.vue';
    import {dashboardService} from '@/services/dashboard.service';
    import ErrorHelper from '@/Helpers/error.helper';
    import app from '../main';

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
        },
    })
    export default class Dashboard extends Vue {
        protected messages: object = {};
        private errorResponse: string = '';

        protected setMessages(data: object) {
            this.messages = data;
        }

        protected setErrorResponse(message: string) {
            this.errorResponse = message;
        }

        mounted() {
            // @ts-ignore
            app.$Progress.finish();
        }
    }
</script>
