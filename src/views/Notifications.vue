<template>
    <div class="">
        <p>Notifications</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Notifications extends Vue {
    public getNotifications() {

    }

    created() {
        this.getNotifications();
    }


}
</script>
