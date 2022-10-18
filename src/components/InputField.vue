<template>
    <div class="input-wrapper">
        <p class="input-wrapper__label" v-if="label">{{ label }}</p>
        <div class="relative">
            <input
                class="input-wrapper__input"
                :class="{ 'input-wrapper__input--error': isError }"
                :type="inputType"
                :value="value"
                :placeholder="placeholder"
                :style="{ paddingRight: type === 'password' ? '48px' : '24px' }"
                @input="event => $emit('input', event.target.value)"
                @change="event => $emit('change', event.target.value)"
            />
            <img
                v-if="type === 'password'"
                class="input-wrapper__eye"
                src="@/assets/icons/eye-invisible.svg"
                alt="Eye Icon"
                @click="handleShowPassword"
            />
            <span v-if="isError && errorMessage" class="input-wrapper__errorMessage">{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: {
            default: 'default value',
        },
        label: {
            type: String,
        },
        placeholder: {
            type: String,
            default: 'write something',
        },
        isError: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
        },
    },
    data() {
        return {
            inputType: 'text',
        }
    },
    methods: {
        handleShowPassword() {
            if (this.inputType === 'text') {
                this.inputType = 'password'
            } else this.inputType = 'text'
        },
    },
    created() {
        this.inputType = this.type
    },
}
</script>

<style lang="scss" scoped>
.input-wrapper {
    display: flex;
    flex-direction: column;
    .relative {
        position: relative;
    }
    &__label {
        font-weight: 600;
        font-size: 18px;
        color: #333333;
        opacity: 0.6;
        margin-bottom: 10px;
    }
    &__input {
        outline: none;
        width: 100%;
        height: 50px;
        padding: 14px 24px;
        background: #ffffff;
        border: 1px solid rgba(51, 51, 51, 0.2);
        border-radius: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        color: #333333;;
        &:focus {
            border: 1px solid rgba(51, 51, 51, 0.6);
        }
        &::placeholder {
            color: #333333;
            opacity: 0.6;
        }

        &--error {
            border: 1px solid rgb(255, 0, 0);
            &:focus {
                border: 1px solid rgb(255, 0, 0);
            }
        }
    }
    &__errorMessage {
        position: absolute;
        font-size: 12px;
        color: rgb(255, 0, 0);
        margin-top: 4px;
        left: 0;
        bottom: -16px;
    }
    &__eye {
        position: absolute;
        right: 24px;
        top: 50%;
        cursor: pointer;
        transform: translate(0, -50%);
    }
}

@media only screen and (max-width: 575px) {
    .input-wrapper {
        p {
            font-size: 14px;
        }
        &__input {
            font-size: 14px;
        }
    }
}
</style>
