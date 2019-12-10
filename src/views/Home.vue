<template>
    <div class="">
        <p class="h1">Welcome</p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import app from '../main';

    @Component({
        beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            next();
        },
    })
    export default class Home extends Vue {
        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }
    }
</script>
