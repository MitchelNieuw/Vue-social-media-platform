<template>
    <div>
        <div class="row">
            <DisplayUserInfo :display-user="this.displayUser"></DisplayUserInfo>
            <div class="col-md-6">
                <div v-if="this.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.errorResponse"></p>
                </div>
                <div v-if="this.response !== ''" class="mx-auto alert alert-dismissible alert-success">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.response"></p>
                </div>
                <DisplayUserMessages :id="id" :display-user="this.displayUser"></DisplayUserMessages>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DisplayUserInfo from '@/components/DisplayUserInfo.vue';
    import DisplayUserMessages from '@/components/DisplayUserMessages.vue';
    import {userService} from '@/services/user.service';
    import app from '../main';
    import router from '@/router';
    import ErrorHelper from "@/Helpers/error.helper";

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
        protected response: string = '';
        private displayUser: object = {};
        private errorResponse: string = '';

        @Prop({required: true})
        private tag!: string;

        @Prop()
        private id!: number;

        protected setDisplayUser(data: object) {
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
