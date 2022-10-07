<template>
    <AppModal class="new-pass">
        <template #header>
            <div class="flex-col-center-center">
                <img src="@/assets/icons/key.svg" alt="Close Icon" width="50" height="50" />
                <h1 class="new-pass__title">{{ $t('setNewPassword') }}</h1>
                <span class="new-pass__text">{{ $t('newPassMustBeDifferent') }}</span>
            </div>
        </template>
        <template #body>
            <div>
                <InputField
                    :type="'password'"
                    :value="payload.password"
                    :label="$t('newPassword')"
                    :placeholder="$t('enterYourPassword')"
                    :isError="$v.payload.password.$error"
                    :errorMessage="
                        !$v.payload.password.required
                            ? $t('fieldIsRequired')
                            : $t('minimumSymbols', { n: $v.payload.password.$params.minLength.min })
                    "
                    @change="val => handleChangeValue('password', val)"
                />

                <InputField
                    class="new-pass__confirm"
                    :type="'password'"
                    :value="payload.newPassword"
                    :label="$t('confirmPassword')"
                    :placeholder="$t('enterYourPassword')"
                    :isError="$v.payload.newPassword.$error"
                    :errorMessage="!$v.payload.password.sameAs ? $t('passwordsMustBeIdentical') : ''"
                    @change="val => handleChangeValue('newPassword', val)"
                />
                <div class="flex-col-center-center">
                    <PrimaryButton
                        class="new-pass__btn full-width"
                        :label="$t('resetPassword')"
                        :disabled="$v.payload.$invalid || loading"
                        :loading="loading"
                        @onClick="handleResetPassword"
                    />
                    <button class="new-pass__back" @click="$emit('changePage', 'login')">
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

// Components
import AppModal from '@/components/AppModal'
import InputField from '@/components/InputField'
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'SetNewPassword',
    mixins: [validationMixin, authenticationMixin],
    components: { AppModal, InputField, PrimaryButton },
    validations: {
        payload: {
            password: { required, minLength: minLength(6) },
            newPassword: { required, sameAsPassword: sameAs('password') },
        },
    },
    data() {
        return {
            payload: {
                password: '',
                newPassword: '',
            },
        }
    },
    methods: {
        ...mapActions('authModule', ['handleSetNewPassword']),
        handleResetPassword() {
            this.handleSetNewPassword(this.payload)
        },
    },
    computed: {
        ...mapGetters('authModule', ['loading', 'passwordChanged']),
    },
    watch: {
        passwordChanged(value) {
            if (value) {
                this.$emit('changePage', 'passwordReset')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.new-pass {
    &__title,
    &__btn {
        margin: 24px 0;
    }
    &__text {
        color: #333333;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
    }
    &__confirm {
        margin: 24px 0 0;
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
