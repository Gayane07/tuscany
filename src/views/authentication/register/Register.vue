<template>
    <AppModal>
        <template #header>
            <div class="flex-between-center">
                <h1>{{ $t('createAccount') }}</h1>
                <div class="cursor-pointer close-icon" @click="$emit('close')">
                    <img src="@/assets/icons/close.svg" alt="Close Icon" width="12" height="12" />
                </div>
            </div>
        </template>
        <template #body>
            <div class="register">
                <div>
                    <InputField
                        :value="payload.name"
                        :label="$t('nameAndSurname')"
                        :placeholder="$t('enterYourName')"
                        :isError="$v.payload.name.$error"
                        :errorMessage="
                            !$v.payload.name.required
                                ? $t('fieldIsRequired')
                                : $t('minimumSymbols', { n: $v.payload.name.$params.minLength.min })
                        "
                        @change="val => handleChangeValue('name', val)"
                    />

                    <InputField
                        class="register__email"
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
                    <div class="flex-between-start">
                        <Checkbox
                            class="register__checkbox"
                            :checked="payload.agreeWithTerms"
                            :id="'terms'"
                            @change="handleSelectTerms"
                        >
                            <template #label>
                                <div>
                                    {{ $t('agreeWith') }}
                                    <router-link class="register__checkbox--link" to="#" target="_blank">{{ $t('terms') }}</router-link>
                                    {{ $t('and') }}
                                    <router-link class="register__checkbox--link" to="#" target="_blank">{{ $t('privacy') }}</router-link>
                                </div>
                            </template>
                        </Checkbox>
                    </div>
                </div>

                <div class="flex-col-center-center">
                    <PrimaryButton
                        class="register__btn full-width"
                        :label="$t('signUp')"
                        :disabled="$v.payload.$invalid || !payload.agreeWithTerms || loading"
                        :loading="loading"
                        @onClick="handleSignUp"
                    />
                    <span class="register__midText">{{ $t('or') }}</span>
                    <!-- Temp Google button -->
                    <button class="register__google full-width">
                        <img src="@/assets/icons/google-logo.svg" alt="Google logo" width="24" height="24" />
                        {{ $t('singUpWithGoogle') }}
                    </button>
                </div>
            </div>
            <div class="flex-center-center register__bottom">
                <span>{{ $t('alreadyHaveAnAccount') }}</span>
                <button @click="$emit('changePage', 'login')">&nbsp;{{ $t('signIn') }}</button>
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
import Checkbox from '@/components/Checkbox'

export default {
    name: 'Register',
    mixins: [validationMixin, authenticationMixin],
    components: { AppModal, InputField, PrimaryButton, Checkbox },
    validations: {
        payload: {
            name: { required, minLength: minLength(4) },
            email: { required, email },
            password: { required, minLength: minLength(6) },
        },
    },
    data() {
        return {
            payload: {
                name: '',
                email: '',
                password: '',
                agreeWithTerms: false,
            },
        }
    },
    methods: {
        ...mapActions('authModule', ['handleRegister']),
        handleSignUp() {
            this.handleRegister(this.payload)
        },
        handleSelectTerms(data) {
            this.payload.agreeWithTerms = data.checked
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
.register {
    font-weight: 500;
    &__email {
        margin: 20px 0;
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
    &__checkbox {
        margin-top: 20px;
        &--link {
            color: #fa8b02;
            &:hover {
                color: #d77a08;
            }
        }
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
