<template>
    <div class="col-md-3">
        <div v-if="displayUser !== undefined">
            <img class="img-profile mr-3"
                 v-lazy="getImageUrl(displayUser.profilePicture)" alt="profile picture">
            <div class="d-inline-block align-middle">
                <p class="m-1 h5" v-text="displayUser.name"/>
                <p class="m-1 text-primary" v-text="'@' + displayUser.tag"/>
            </div>
            <div class="mt-3" v-if="displayUser.followerCount !== undefined
                                    && displayUser.followingCount !== undefined">
                <router-link :to="'/user/' + displayUser.tag + '/following'"
                             class="d-inline-block m-0 mr-3" v-text="'Following ' + displayUser.followingCount">
                </router-link>
                <router-link :to="'/user/' + displayUser.tag + '/followers'"
                             class="d-inline-block m-0" v-text="'Followers ' + displayUser.followerCount">
                </router-link>
                <div class="btn-group my-1">
                    <form @submit.prevent="follow()" v-if="displayUser.possibleFollow"
                          class="mt-2 float-right">
                        <button class="btn btn-outline-primary mr-3" type="submit">Follow</button>
                    </form>
                    <form @submit.prevent="unFollow()" v-if="displayUser.possibleUnFollow"
                          class="mt-2 float-right">
                        <button class="btn btn-primary mr-3" type="submit">Unfollow</button>
                    </form>
                    <form @submit.prevent="ban()" v-if="displayUser.possibleBan" class="mt-2 float-right">
                        <button class="btn btn-outline-danger mr-3" type="submit">Ban</button>
                    </form>
                    <form @submit.prevent="unBan()" v-if="displayUser.possibleUnBan" class="mt-2 float-right">
                        <button class="btn btn-danger mr-3" type="submit">Unban</button>
                    </form>
                    <form @submit.prevent="turnOnNotifications()" v-if="displayUser.possibleTurnOnNotifications"
                          class="mt-2 float-right">
                        <button class="btn btn-outline-info mr-3"><i class="far fa-bell"/></button>
                    </form>
                    <form @submit.prevent="turnOffNotifications()" v-if="displayUser.possibleTurnOffNotifications"
                          class="mt-2 float-right">
                        <button class="btn btn-info mr-3"><i class="far fa-bell-slash"/></button>
                    </form>
                </div>
            </div>
            <p class="m-0">Since {{ displayUser.createdAt | formatDate }}</p>
        </div>
    </div>
</template>

<style scoped lang="css">
    @import '~@fortawesome/fontawesome-free/css/all.min.css';
</style>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {userService} from '@/_core/services/user.service';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import {dateTimeHelper} from '@/_core/helpers/date.helper';
    import {IDisplayUser} from '@/_core/contracts/display-user.contract';

    @Component({
        filters: {
            formatDate(date: string|undefined) {
                if (date !== undefined) {
                    return dateTimeHelper.filterDate(date);
                }
            }
        }
    })
    export default class DisplayUserInfo extends Vue {
        private response: string = '';

        @Prop()
        private displayUser!: IDisplayUser|undefined;

        public getImageUrl(image: string): string {
            return 'https://localhost/profilePictures/' + image;
        }

        public async follow(): Promise<void> {
            await userService.follow(this.$props.displayUser.tag)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.displayUser.possibleFollow = false;
                    this.$props.displayUser.possibleUnFollow = true;
                    this.$props.displayUser.followerCount += 1;
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }

        public async unFollow(): Promise<void> {
            await userService.unFollow(this.$props.displayUser.tag)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.displayUser.possibleFollow = true;
                    this.$props.displayUser.possibleUnFollow = false;
                    this.$props.displayUser.followerCount -= 1;
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }

        public async ban(): Promise<void> {
            await userService.ban(this.$props.displayUser.tag)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.displayUser.possibleFollow = false;
                    this.$props.displayUser.possibleUnFollow = false;
                    this.$props.displayUser.possibleTurnOnNotifications = false;
                    this.$props.displayUser.possibleTurnOffNotifications = false;
                    this.$props.displayUser.possibleBan = false;
                    this.$props.displayUser.possibleUnBan = true;
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }

        public async unBan(): Promise<void> {
            await userService.unBan(this.$props.displayUser.tag)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.displayUser.possibleFollow = true;
                    this.$props.displayUser.possibleUnFollow = true;
                    this.$props.displayUser.possibleTurnOnNotifications = true;
                    this.$props.displayUser.possibleTurnOffNotifications = true;
                    this.$props.displayUser.possibleBan = true;
                    this.$props.displayUser.possibleUnBan = false;
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }

        public async turnOnNotifications(): Promise<void> {
            await userService.turnOnNotifications(this.$props.displayUser.tag)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.displayUser.possibleTurnOnNotifications = true;
                    this.$props.displayUser.possibleTurnOffNotifications = false;
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }

        public async turnOffNotifications(): Promise<void> {
            await userService.turnOffNotifications(this.$props.displayUser.tag)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.displayUser.possibleTurnOnNotifications = false;
                    this.$props.displayUser.possibleTurnOffNotifications = true;
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }
    }
</script>
