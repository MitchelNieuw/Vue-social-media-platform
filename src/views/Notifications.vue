<template>
    <div>
        <p class="h4 text-center mb-4">Notifications</p>
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div v-if="this.$store.state.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.$store.state.errorResponse"></p>
                </div>
                <div v-if="this.$store.state.response !== ''" class="mx-auto alert alert-dismissible alert-success">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.$store.state.response"></p>
                </div>
            </div>
        </div>
        <AllNotifications></AllNotifications>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';
import AllNotifications from '@/components/AllNotifications.vue';
import app from '../main';

@Component({
    components: {
        AllNotifications,
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('getNotifications');
        // @ts-ignore
        app.$Progress.start();
        next();
    },
    mounted() {
        // @ts-ignore
        app.$Progress.finish();
    },
    beforeDestroy() {
        store.commit('clear_new_notifications');
        store.state.errorResponse = '';
        store.state.response = '';
    },
})
export default class Notifications extends Vue {
}
</script>
