<template>
    <div>
        <div v-for="(follower, index) in this.followers" :key="index">
            <div class="row">
                <div class="col-md-6 mx-auto mb-3">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <div class="" v-if="follower.user.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     :src="process.env.VUE_APP_API_URL + follower.following.profilePicture"
                                     :alt="'@'+follower.following.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follower.following.name"/>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follower.following.tag"/>
                            </div>
                            <div class="" v-else-if="follower.following.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     :src="process.env.VUE_APP_API_URL + follower.user.profilePicture"
                                     :alt="'@'+follower.user.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follower.user.name"/>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follower.user.tag"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import app from '../main';
    import {followService} from '@/_core/services/follow.service';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import router from '@/router';
    import {IFollower} from '@/_core/contracts/follower.contract';

    @Component({
        async beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            await followService.getFollowers(to.params.tag)
                .then((response) => {
                    next(vm => {
                        // @ts-ignore
                        vm.setFollowers(response.data.followers);
                    });
                }).catch((error) => {
                    console.log(ErrorHelper.returnErrorMessage(error));
                    router.go(-1);
                });
            next();
        },
    })

    export default class Followers extends Vue {
        public followers: Array<IFollower> = [];

        @Prop({required: true, default: ''})
        private tag!: string;

        public setFollowers(followers: Array<IFollower>) {
            this.followers = followers;
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }
    }
</script>
