<template>
    <div class="">
        <div v-for="(follow, index) in this.$store.state.following" :key="index">
            <div class="row">
                <div class="col-md-6 mx-auto mb-3">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <div class="" v-if="follow.user.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     v-lazy="getImageUrl(follow.following.profilePicture)"
                                     :alt="'@'+follow.following.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follow.following.name"></p>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follow.following.tag"></p>
                            </div>
                            <div class="" v-else-if="follow.following.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     v-lazy="getImageUrl(follow.user.profilePicture)"
                                     :alt="'@'+follow.user.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follow.user.name"></p>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follow.user.tag"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';
import app from '../main';

@Component({
    props: {
        tag: {
            type: String,
            default: '',
        },
    },
    async beforeRouteEnter(to, from, next) {
        // @ts-ignore
        app.$Progress.start();
        await store.dispatch('getFollowing', to.params.tag);
        next();
    },
    mounted() {
        // @ts-ignore
        app.$Progress.finish();
    },
})

export default class Following extends Vue {
    public getImageUrl(image: string): string {
        return 'https://localhost/profilePictures/' + image;
    }
}
</script>
