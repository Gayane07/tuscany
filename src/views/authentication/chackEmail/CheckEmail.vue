<template>
    <AppModal class="check-email">
        <template #header>
            <div class="flex-col-center-center">
                <img src="@/assets/icons/mail.svg" :alt="$t('emailIcon')" width="50" height="50" />
                <h1 class="check-email__title">{{ $t('checkYourEmail') }}</h1>
                <span
                    class="check-email__text"
                    v-html="$t('weSentResetLink', { email: emailForResetPassword })"
                ></span>
            </div>
        </template>
        <template #body>
            <div class="flex-col-center-center">
                <PrimaryButton
                    class="check-email__btn full-width"
                    :label="$t('openEmailApp')"
                    @onClick="$emit('changePage', 'setNewPassword')"
                />
                <div class="flex-center-center check-email__resend">
                    <span>{{ $t('didntReceiveEmail') }}</span>
                    <button @click="$emit('changePage', 'forgotPassword')">
                        &nbsp;{{ $t('clickToResend') }}
                    </button>
                </div>
                <button class="check-email__back" @click="$emit('changePage', 'login')">
                    <img src="@/assets/icons/arrow-back.svg" :alt="$t('arrowBack')" />
                    <span>{{ $t('backToLogin') }}</span>
                </button>
            </div>
        </template>
    </AppModal>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

// Components
import AppModal from '@/components/AppModal'
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'CheckEmail',
    components: { AppModal, PrimaryButton },
    methods: {
        ...mapMutations('authModule', ['removeMessageSentValue']),
    },
    computed: {
        ...mapGetters('authModule', ['emailForResetPassword']),
    },

    beforeDestroy() {
        this.removeMessageSentValue()
    },
}
</script>

<style lang="scss" scoped>
.check-email {
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
    &__resend {
        font-weight: 400;
        font-size: 14px;
        color: #333333;
        button {
            color: #fa8b02;
            font-weight: 600;
            transition: 0.2s;
            &:hover {
                color: #d77a08;
                transition: 0.2s;
            }
        }
    }
    &__back {
        font-weight: 600;
        font-size: 14px;
        color: #33333366;
        margin-top: 24px;
        img {
            margin-right: 6px;
            filter: opacity(0.4);
        }
    }
}

@media only screen and (max-width: 575px) {
    .check-email {
        &__resend {
            flex-direction: column;
            span {
                margin-bottom: 8px;
            }
        }
    }
}

@media only screen and (max-height: 400px) {
    .check-email {
        &__btn {
            margin: 16px 0;
        }
    }
}
</style>
