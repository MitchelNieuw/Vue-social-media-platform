<template>
    <div>
        <div class="row">
            <div v-if="this.errorResponse !== ''" class="col-md-6 mx-auto">
                <div class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.errorResponse"></p>
                </div>
            </div>
            <div v-if="this.response !== ''" class="col-md-6 mx-auto">
                <div class="mx-auto alert alert-dismissible alert-success">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.response"></p>
                </div>
            </div>
        </div>
        <div class="row" v-for="(notification, index) in notifications" :key="index">
            <div class="col-md-6 mx-auto">
                <div class="card bg-dark mb-3">
                    <div class="card-body">
                        <form class="float-right" @submit.prevent="deleteNotification(notification, index)">
                            <button class="close text-danger" type="submit">
                                <span>&times;</span>
                            </button>
                        </form>
                        <p class="d-inline-block" v-text="notification.data.message"></p>
                        <a :href="notification.data.link" class="d-inline-block"
                           v-text="notification.data.link"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {notificationService} from '@/Services/notification.service';
    import ErrorHelper from '@/Helpers/error.helper';

    @Component
    export default class AllNotifications extends Vue {
        private response: string = '';
        private errorResponse: string = '';

        @Prop({required: true})
        private notifications!: [];

        protected async deleteNotification(notification: any, index: any): Promise<void> {
            await notificationService.deleteNotification(notification)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.notifications.splice(index, 1);
                }).catch((error) => {
                    this.errorResponse = ErrorHelper.returnErrorMessage(error);
                });
        }
    }
</script>
