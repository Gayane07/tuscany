<template>
    <div class="main">
        <div class="modal" :style="{ width: width + 'px' }">
            <div class="modal__wrapper">
                <div class="modal__header" :class="{ 'with-shadow': scrolled }">
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
    data() {
        return {
            scrolled: false,
        }
    },
    mounted() {
        document.body.style.overflow = 'hidden'

        const modalBody = document.querySelector('.modal .modal__body')
        modalBody.addEventListener('scroll', () => {
            modalBody.scrollTop !== 0 ? (this.scrolled = true) : (this.scrolled = false)
        })
    },
    beforeDestroy() {
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
    overflow-y: auto;
    &__wrapper {
        padding: 40px 0px;
    }
    &__header {
        padding: 0 60px 24px;
        transition: 0.2s;
        h1 {
            font-size: 32px;
            font-weight: 700;
        }
        &.with-shadow {
            transition: 0.2s;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
        }
    }
    &__body {
        max-height: 500px;
        overflow-y: auto;
        padding: 0 60px;
    }
    &__footer {
    }
}

@media only screen and (max-width: 1359px) {
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
    .modal {
        &__header {
            padding-bottom: 0 !important;
            h1 {
                font-size: 28px;
                margin: 16px 0;
            }
        }
        &__body {
            margin-top: 16px;
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .modal {
        &__header {
            h1 {
                font-size: 22px;
            }
        }
    }
}
@media only screen and (max-width: 475px) {
}

// Max Heights
@media only screen and (max-height: 900px) {
    .modal {
        &__wrapper {
            padding: 20px 0;
        }
        &__header {
            padding: 0 30px 24px;
        }
        &__body {
            max-height: 50vh;
            padding: 0 30px;
        }
    }
}

@media only screen and (max-height: 400px) {
    .modal {
        &__header {
            h1 {
                font-size: 24px;
                margin: 8px 0;
            }
        }
    }
}
</style>
