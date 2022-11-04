<template>
    <div class="stepper">
        <div class="stepper__wrapper">
            <div class="bg"></div>
            <div class="progress" :style="{ width: computeProgressWidth }"></div>

            <div class="stepper_overlay">
                <div class="flex-between-center stepper__wrapper--content">
                    <div
                        class="flex-col-center-center stepper__wrapper--content__item"
                        :class="{ active: index < currentStepNum }"
                        v-for="(step, index) in steps"
                        :key="step.id"
                        @click="handleChangeStep(index + 1)"
                    >
                        <p>{{ index + 1 }}</p>
                        <span>{{ step.label }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StepperComponent',
    props: {
        steps: {
            type: Array,
            default: () => [],
        },
        currentStepNum: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        handleChangeStep(stepNum) {
            if (stepNum >= this.currentStepNum) return
            this.$emit('changeStep', stepNum)
        }
    },
    computed: {
        computeProgressWidth() {
            return ((this.currentStepNum - 1) * 100) / (this.steps.length - 1) + '%'
        },
    },
}
</script>

<style lang="scss" scoped>
.stepper {
    width: 100%;
    margin-top: 32px;
    &__wrapper {
        position: relative;
        .bg {
            width: 100%;
            height: 4px;
            background-color: silver;
        }
        .progress {
            height: 4px;
            margin-top: -4px;
            background: #fa8b02;
        }

        .stepper_overlay {
            width: calc(100% + 90px);
            transform: translate(-45px, 0);
        }
        &--content {
            margin-top: -20px;
            white-space: nowrap;
            &__item {
                max-width: 90px;
                p {
                    border-radius: 50%;
                    padding: 5px 12px;
                    color: rgba(51, 51, 51, 0.4);
                    font-weight: 600;
                    font-size: 20px;
                    background: #efefef;
                }
                span {
                    color: rgba(51, 51, 51, 0.4);
                    font-weight: 400;
                    font-size: 20px;
                }
                &.active {
                    cursor: pointer;
                    p {
                        background: #fa8b02;
                        color: #fff;
                    }
                    span {
                        color: #fa8b02;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
    .stepper {
        &__wrapper {
            &--content {
                &__item {
                    p {
                        font-size: 18px;
                    }
                    span {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .stepper {
        &__wrapper {
            &--content {
                &__item {
                    p {
                        font-size: 16px;
                    }
                    span {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .stepper {
        .stepper_overlay {
            width: calc(100% + 70px);
            transform: translate(-35px, 0);
        }
        &__wrapper {
            &--content {
                margin-top: -15px;
                &__item {
                    max-width: 50px;
                    p {
                        font-size: 12px;
                        padding: 4px 10px;
                    }
                    span {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 475px) {
}
</style>
