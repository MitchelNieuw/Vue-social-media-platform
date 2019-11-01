<template>
    <DashboardMessages></DashboardMessages>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';
import DashboardMessages from '@/components/DashboardMessages.vue';
import app from '../main';

@Component({
    components: {
        DashboardMessages,
    },
    async beforeRouteEnter(to, from, next) {
        // @ts-ignore
        app.$Progress.start();
        await store.dispatch('getDashboardMessages');
        next();
    },
    mounted() {
        // @ts-ignore
        app.$Progress.finish();
    }
})
export default class Dashboard extends Vue {
}
</script>
