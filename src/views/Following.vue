<template>
    <div class="">
        <div v-for="(follow, index) in this.following" :key="index">
            <div class="row">
                <div class="col-md-6 mx-auto mb-3">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <div class="" v-if="follow.user.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     v-lazy="getImageUrl(follow.following.profilePicture)"
                                     :alt="'@'+follow.following.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follow.following.name"/>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follow.following.tag"/>
                            </div>
                            <div class="" v-else-if="follow.following.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     v-lazy="getImageUrl(follow.user.profilePicture)"
                                     :alt="'@'+follow.user.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follow.user.name"/>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follow.user.tag"/>
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
    import {followService} from '@/_core/services/follow.service';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import app from '../main';
    import router from '@/router';
    import {IFollowing} from '@/_core/contracts/following.contract';

    @Component({
        async beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            await followService.getFollowing(to.params.tag)
                .then((response) => {
                    next(vm => {
                        // @ts-ignore
                        vm.setFollowing(response.data.following)
                    });
                }).catch((error) => {
                    console.log(ErrorHelper.returnErrorMessage(error));
                    router.go(-1);
                });
            next();
        }
    })

    export default class Following extends Vue {
        protected following: Array<IFollowing> = [];

        @Prop({required: true, default: ''})
        private tag!: string;

        public getImageUrl(image: string): string {
            return 'https://localhost/profilePictures/' + image;
        }

        public setFollowing(following: Array<IFollowing>) {
            this.following = following;
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }
    }
</script>
