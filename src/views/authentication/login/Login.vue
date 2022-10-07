<template>
    <AppModal>
        <template #header>
            <div class="flex-between-center">
                <h1>{{ $t('login') }}</h1>
                <div class="cursor-pointer close-icon" @click="$emit('close')">
                    <img src="@/assets/icons/close.svg" alt="Close Icon" width="12" height="12" />
                </div>
            </div>
        </template>
        <template #body>
            <div class="login">
                <div>
                    <InputField
                        :value="payload.email"
                        :label="$t('emailAddress')"
                        :placeholder="$t('enterYourEmail')"
                        :isError="$v.payload.email.$error"
                        :errorMessage="
                            !$v.payload.email.required ? $t('fieldIsRequired') : $t('incorrectEmail')
                        "
                        @change="val => handleChangeValue('email', val)"
                    />

                    <InputField
                        class="login__pass"
                        :type="'password'"
                        :value="payload.password"
                        :label="$t('password')"
                        :placeholder="$t('enterYourPassword')"
                        :isError="$v.payload.password.$error"
                        :errorMessage="
                            !$v.payload.password.required
                                ? $t('fieldIsRequired')
                                : $t('minimumSymbols', { n: $v.payload.password.$params.minLength.min })
                        "
                        @change="val => handleChangeValue('password', val)"
                    />
                    <div class="flex-end-center">
                        <button class="login__forgotBtn" @click="$emit('changePage', 'forgotPassword')">
                            {{ $t('forgotYourPassword') }}
                        </button>
                    </div>
                </div>

                <div class="flex-col-center-center">
                    <PrimaryButton
                        class="login__btn full-width"
                        :label="$t('signIn')"
                        :disabled="$v.payload.$invalid || loading"
                        :loading="loading"
                        @onClick="handleSignIn"
                    />
                    <span class="login__midText">{{ $t('or') }}</span>
                    <!-- Temp Google button -->
                    <button class="login__google full-width">
                        <img src="@/assets/icons/google-logo.svg" alt="Google logo" width="24" height="24" />
                        {{ $t('singInWithGoogle') }}
                    </button>
                </div>
            </div>
            <div class="flex-center-center login__bottom">
                <span>{{ $t('dontHaveAccount') }}</span>
                <button @click="$emit('changePage', 'register')">&nbsp;{{ $t('signUp') }}</button>
            </div>
        </template>
    </AppModal>
</template>

<script>
import authenticationMixin from '@/mixins/authenticationMixin'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

// Components
import AppModal from '@/components/AppModal'
import InputField from '@/components/InputField'
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'Login',
    mixins: [validationMixin, authenticationMixin],
    components: { AppModal, InputField, PrimaryButton },
    validations: {
        payload: {
            email: { required, email },
            password: { required, minLength: minLength(6) },
        },
    },
    data() {
        return {
            payload: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        ...mapActions('authModule', ['handleLogIn']),
        handleSignIn() {
            this.handleLogIn(this.payload)
        },
    },
    computed: {
        ...mapGetters('authModule', ['loading']),
    },
}
</script>

<style lang="scss" scoped>
.close-icon {
    padding: 8px;
}
.login {
    font-weight: 500;
    &__pass {
        margin-top: 20px;
    }
    &__forgotBtn {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 0.6);
        margin-top: 20px;
    }

    &__btn {
        margin-top: 24px;
    }
    &__midText {
        color: #33333366;
        font-size: 16px;
        font-weight: 400;
        margin: 6px 0;
    }
    &__google {
        position: relative;
        border: 1px solid silver;
        padding: 10px 24px;
        border-radius: 50px;
        color: #33333366;
        img {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translate(0, -50%);
            margin-right: 10px;
        }
    }

    &__bottom {
        font-size: 16px;
        margin-top: 24px;
        span {
            font-weight: 400;
            color: #333333;
        }
        button {
            color: #fa8b02;
            transition: 0.2s;
            &:hover {
                color: #d77a08;
                transition: 0.2s;
            }
        }
    }
}
</style>
