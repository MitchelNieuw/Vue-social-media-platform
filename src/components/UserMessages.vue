<template>
    <div class="">
        <!--        <div class="alert alert-dismissible alert-danger mx-auto" v-if="this.$store.state.response">-->
        <!--            <button type="button" class="close" data-dismiss="alert">&times;</button>-->
        <!--            <p v-text="this.$store.state.response"></p>-->
        <!--        </div>-->
        <div v-if="this.$store.state.messages !== undefined">
            <div class="" v-if="this.$store.state.response !== ''">
                <p v-text="this.$store.state.response"></p>
            </div>
            <div v-for="(message, index) in this.$store.state.messages" :key="index" class="row">
                <div class="col-md-6 mx-auto m-2">
                    <div class="card">
                        <div class="card-body">
                            <p class="mb-0 d-inline-block" v-text="message.content"></p>
                            <form class="d-inline-block float-right" @submit.prevent="deleteMessage(message)">
                                <button class="close text-danger pt-0" type="submit">
                                    <span>&times;</span>
                                </button>
                            </form>
                            <div class="card-footer m-0 p-0 bg-white border-0 text-muted">
                                <p class="mb-0" v-text="message.created_at"></p>
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
import { messageService } from '@/Services/message.service';

@Component
export default class UserMessages extends Vue {
    protected response: string = '';

    public async deleteMessage(message: any) {
        await messageService.deleteMessage(message, this.$store.getters.jwtToken);
        await this.$store.dispatch('getMessages');
    }

    created() {
        this.$store.dispatch('getMessages');
    }
}
</script>
