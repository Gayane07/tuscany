<template>
    <div class="main">
        <div class="modal" :style="{ width: width + 'px' }">
            <div class="modal__wrapper">
                <div class="modal__header">
                    <slot name="header">default header</slot>
                </div>
                <div class="modal__body">
                    <slot name="body">default body</slot>
                </div>
                <div class="modal__footer" v-if="!hideFooter">
                    <slot name="footer">default footer</slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppModal',
    props: {
        hideFooter: {
            type: Boolean,
            default: true,
        },
        width: {
            type: Number,
            default: 488,
        },
    },
    created() {
        this.$nextTick(() => {
            document.body.style.overflow = 'hidden'
        })
    },
    destroyed() {
        document.body.style.overflow = 'auto'
    },
}
</script>

<style lang="scss" scoped>
.main {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #333333cc;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.modal {
    background: #fff;
    box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    max-height: 600px;
    overflow-y: auto;
    &__wrapper {
        padding: 40px 60px;
    }
    &__header {
        h1 {
            font-size: 32px;
            font-weight: 700;
        }
    }
    &__body {
        margin-top: 24px;
    }
    &__footer {
    }
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #fa8b02;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #d77a08;
}
</style>
