<template>
    <div>
        <div class="row">
            <DisplayUserInfo :display-user="this.displayUser"/>
            <div class="col-md-6">
                <div v-if="this.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.errorResponse"/>
                </div>
                <div v-if="this.response !== ''" class="mx-auto alert alert-dismissible alert-success">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.response"/>
                </div>
                <DisplayUserMessages :id="id" :display-user="this.displayUser"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DisplayUserInfo from '@/components/DisplayUserInfo.vue';
    import DisplayUserMessages from '@/components/DisplayUserMessages.vue';
    import {userService} from '@/_core/services/user.service';
    import app from '../main';
    import router from '@/router';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import {IDisplayUser} from '@/_core/contracts/display-user.contract';

    @Component({
        components: {
            DisplayUserInfo,
            DisplayUserMessages,
        },
        async beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            await userService.getDisplayUser(to.params.tag)
                .then((response) => {
                    next(vm => {
                        //@ts-ignore
                        vm.setDisplayUser(response.data.data);
                    });
                }).catch((error) => {
                    console.log(ErrorHelper.returnErrorMessage(error));
                    router.go(-1);
                });
            next();
        },
    })
    export default class DisplayUser extends Vue {
        public response: string = '';
        public displayUser: object = {};
        public errorResponse: string = '';

        @Prop({required: true})
        private tag!: string;

        @Prop()
        private id!: number;

        protected setDisplayUser(data: IDisplayUser) {
            this.displayUser = data;
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }

        beforeDestroy() {
            this.errorResponse = '';
        }
    }
</script>
