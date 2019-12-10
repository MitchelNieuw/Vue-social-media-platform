<template>
    <div>
        <p class="h4 text-center mb-4">Notifications</p>
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div v-if="this.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.errorResponse"/>
                </div>
            </div>
        </div>
        <AllNotifications :notifications="this.notifications"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AllNotifications from '@/components/AllNotifications.vue';
    import {notificationService} from '@/_core/services/notification.service';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import app from '../main';
    import {INotification} from '@/_core/contracts/notification.contract';
    import store from '@/store';

    @Component({
        components: {
            AllNotifications,
        },
        async beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            await notificationService.getNotifications()
                .then((response) => {
                    next(vm => {
                        // @ts-ignore
                        vm.setNotifications(response.data.data);
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
    export default class Notifications extends Vue {
        public notifications: Array<INotification> = [];
        public errorResponse: string = '';

        protected setNotifications(notifications: Array<INotification>) {
            this.notifications = notifications;
        }

        protected setErrorResponse(message: string) {
            this.errorResponse = message;
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }

        beforeDestroy() {
            store.commit('clear_new_notifications');
            this.errorResponse = '';
        }
    }
</script>
