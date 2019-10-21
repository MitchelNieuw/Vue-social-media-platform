<template>
    <div v-if="this.messages !== undefined">
        <div v-for="(message, index) in this.messages" :key="index" class="row">
            <div class="col-md-6 mx-auto m-2">
                <div class="card">
                    <div class="card-body">
                        <p class="mb-0 d-inline-block" v-text="message.content"></p>
                        <form class="d-inline-block float-right" @submit.prevent="deleteMessage(message, index)">
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { messageService } from '@/Services/message.service';
import { updateBus } from '@/Events/updateMessageEvent';

@Component
export default class UserMessages extends Vue {
    public messages = JSON.parse(localStorage.getItem('messages'));
    protected jwtToken = this.$cookies.get('user').jwtToken;

    public async getMessages() {
        await messageService.getMessages(this.jwtToken);
    }

    public deleteMessage(message: any, index: any) {
        messageService.deleteMessage(message, index, this.jwtToken);
    }

    created() {
        this.getMessages();
        updateBus.$on('add-message', (data: any) => {
            this.messages.unshift(data.data);
        });
        updateBus.$on('update-messages', (index: any) => {
            this.messages.splice(index, 1);
        });
    }
}
</script>
