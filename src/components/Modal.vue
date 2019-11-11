<template>
    <transition name="modal">
        <div class="modal-mask" @click="close()" v-show="show">
            <div class="modal-container h-auto my-5 bg-dark">
                <button class="float-right close text-danger pt-0" @click.stop="close()">
                    <span aria-hidden="true">&times;</span>
                </button>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
        overflow-x: auto;
    }

    .modal-container {
        width: 75%;
        height: 100%;
        margin: 0 auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        mounted() {
            document.addEventListener('keydown', (e) => {
                if (this.$props.show && e.keyCode == 27) {
                    // @ts-ignore
                    this.close();
                }
            })
        }
    })
    export default class Modal extends Vue {
        @Prop()
        private show!: boolean;

        public close(): void {
            this.$emit('close');
        }
    }
</script>
