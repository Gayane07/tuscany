<template>
    <AppModal class="pass-reset">
        <template #header>
            <div class="flex-col-center-center">
                <img src="@/assets/icons/check.svg" :alt="$t('checkIcon')" width="50" height="50" />
                <h1 class="pass-reset__title">{{ $t('passwordReset') }}</h1>
                <span class="pass-reset__text">{{ $t('passwordSuccessfullyReset') }}</span>
            </div>
        </template>
        <template #body>
            <div class="flex-col-center-center">
                <PrimaryButton
                    class="pass-reset__btn full-width"
                    :label="$t('continue')"
                    @onClick="$emit('changePage', 'login')"
                />
                <button class="pass-reset__back" @click="$emit('changePage', 'login')">
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
    name: 'PasswordReset',
    components: { AppModal, PrimaryButton },
    methods: {
        ...mapMutations('authModule', ['removeMessageSentValue', 'setPasswordSuccessfullyChanged']),
    },
    computed: {
        ...mapGetters('authModule', ['emailForResetPassword']),
    },

    beforeDestroy() {
        this.setPasswordSuccessfullyChanged(false)
    }
}
</script>

<style lang="scss" scoped>
.pass-reset {
    &__title {
        margin: 24px 0;
    }
    &__text {
        color: #333333;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
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
</style>
