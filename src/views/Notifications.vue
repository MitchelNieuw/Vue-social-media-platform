<template>
    <div class="">
<!--        <div class="alert alert-dismissible alert-danger mx-auto" v-if="this.$store.state.response">-->
<!--            <button type="button" class="close" data-dismiss="alert">&times;</button>-->
<!--            <p v-text="this.$store.state.response"></p>-->
<!--        </div>-->
        <div class="" v-if="this.$store.state.notifications !== []">
            <div class="row" v-for="(notification, index) in this.$store.state.notifications" :key="index">
                <div class="col-md-6 mx-auto">
                    <div class="card shadow mb-3">
                        <div class="card-body">
                            <form class="float-right" @submit.prevent="deleteNotification(notification)">
                                <button class="close text-danger" type="submit">
                                    <span>&times;</span>
                                </button>
                            </form>
                            <p class="d-inline-block" v-text="notification.data.message"></p>
                            <a :href="notification.data.link"
                               class="d-inline-block" v-text="notification.data.link"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { notificationService } from '@/Services/notification.service';

@Component
export default class Notifications extends Vue {
    protected async deleteNotification(notification: any) {
        await notificationService.deleteNotification(notification, this.$store.getters.jwtToken);
        await this.$store.commit('remove_notification');
    }

    async beforeCreate() {
        await this.$store.dispatch('getNotifications');
    }

    beforeDestroy() {
        this.$store.state.response = '';
    }
}
</script>
