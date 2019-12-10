<template>
    <div>
        <div class="row">
            <div v-if="errorResponse !== ''" class="col-md-6 mx-auto">
                <div class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="errorResponse"/>
                </div>
            </div>
            <div v-if="response !== ''" class="col-md-6 mx-auto">
                <div class="mx-auto alert alert-dismissible alert-success">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="response"/>
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
                        <p class="d-inline-block" v-text="notification.data.message"/>
                        <a :href="notification.data.link" class="d-inline-block"
                           v-text="notification.data.link"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {notificationService} from '@/_core/services/notification.service'
    import ErrorHelper from '@/_core/helpers/error.helper';
    import {INotification} from '@/_core/contracts/notification.contract';

    @Component
    export default class AllNotifications extends Vue {
        private response: string = '';
        private errorResponse: string = '';

        @Prop({required: true})
        private notifications!: Array<INotification>;

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
