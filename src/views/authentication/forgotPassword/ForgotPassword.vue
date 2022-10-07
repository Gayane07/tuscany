<template>
    <AppModal class="reset">
        <template #header>
            <div class="flex-col-center-center">
                <img
                    src="@/assets/icons/key.svg"
                    alt="Close Icon"
                    width="50"
                    height="50"
                />
                <h1 class="reset__title">{{ $t('forgotPassword') }}</h1>
                <span class="reset__text">{{ $t('sendYouInstructions') }}</span>
            </div>
        </template>
        <template #body>
            <div>
                <InputField
                    :value="payload.email"
                    :label="$t('emailAddress')"
                    :placeholder="$t('enterYourEmail')"
                    :isError="$v.payload.email.$error"
                    :errorMessage="!$v.payload.email.required ? $t('fieldIsRequired') : $t('incorrectEmail')"
                    @change="val => handleChangeValue('email', val)"
                />
                <div class="flex-col-center-center">
                    <PrimaryButton
                        class="reset__btn full-width"
                        :label="$t('resetPassword')"
                        :disabled="$v.payload.$invalid || loading"
                        :loading="loading"
                        @onClick="handleResetPassword"
                    />
                    <button class="reset__back" @click="$emit('changePage', 'login')">
                        <img src="@/assets/icons/arrow-back.svg" :alt="$t('arrowBack')" />
                        <span>{{ $t('backToLogin') }}</span>
                    </button>
                </div>
            </div>
        </template>
    </AppModal>
</template>

<script>
import authenticationMixin from '@/mixins/authenticationMixin'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

// Components
import AppModal from '@/components/AppModal'
import InputField from '@/components/InputField'
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'ForgotPassword',
    mixins: [validationMixin, authenticationMixin],
    components: { AppModal, InputField, PrimaryButton },
    validations: {
        payload: {
            email: { required, email },
        },
    },
    data() {
        return {
            payload: {
                email: '',
            },
        }
    },
    methods: {
        ...mapActions('authModule', ['resetPassword']),
        handleResetPassword() {
            this.resetPassword(this.payload)
        },
    },
    computed: {
        ...mapGetters('authModule', ['loading', 'messageSent'])
    },
    watch: {
        messageSent(value) {
            if (value) {
                this.$emit('changePage', 'checkEmail')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.reset {
    &__title,
    &__btn {
        margin: 24px 0;
    }
    &__text {
        color: #333333;
        font-weight: 400;
        font-size: 16px;
    }
    &__back {
        font-weight: 600;
        font-size: 14px;
        color: #33333366;
        img {
            margin-right: 6px;
            filter: opacity(0.4);
        }
    }
}
</style>
