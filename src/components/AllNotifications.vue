<template>
    <div>
        <div class="row" v-for="(notification, index) in this.$store.state.notifications" :key="index">
            <div class="col-md-6 mx-auto">
                <div class="card bg-dark mb-3">
                    <div class="card-body">
                        <form class="float-right" @submit.prevent="deleteNotification(notification, index)">
                            <button class="close text-danger" type="submit">
                                <span>&times;</span>
                            </button>
                        </form>
                        <p class="d-inline-block" v-text="notification.data.data.message"></p>
                        <a :href="notification.data.data.link" class="d-inline-block"
                           v-text="notification.data.data.link"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { notificationService } from '@/Services/notification.service';
import store from '@/store';

@Component({
})
export default class AllNotifications extends Vue {
    protected async deleteNotification(notification: any, index: any) {
        await notificationService.deleteNotification(notification, index);
        await store.dispatch('getNotifications');
    }
}
</script>
