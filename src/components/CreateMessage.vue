<template>
    <div class="col-md-6 mb-2">
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="storeMessage()">
                    <div class="form-group">
                        <label for="content">Message</label>
                        <textarea name="content" class="form-control" id="content" v-model="content"></textarea>
                    </div>
                    <button class="btn btn-outline-dark float-right" type="submit">Place</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { messageService } from '@/Services/message.service';

    @Component
    export default class CreateMessage extends Vue {
        protected content: string = '';
        protected jwtToken: string = this.$cookies.get('user').jwtToken;

        public storeMessage() {
            messageService.storeMessage(this.content, this.jwtToken);
            this.content = '';
        }
    }
</script>
