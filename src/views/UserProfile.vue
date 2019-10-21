<template>
    <div class="">
        <div class="row">
            <UserInfo></UserInfo>
            <CreateMessage></CreateMessage>
        </div>
        <UserMessages></UserMessages>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CreateMessage from '@/components/CreateMessage.vue';
    import UserMessages from '@/components/UserMessages.vue';
    import UserInfo from "@/components/UserInfo.vue";

    @Component({
        components: {
            CreateMessage,
            UserMessages,
            UserInfo,
        },
    })
    export default class UserProfile extends Vue {
    }
</script>
