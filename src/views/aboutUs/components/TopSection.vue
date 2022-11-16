<template>
    <div class="top">
        <div class="top__title flex-col-center-center">
            <h1>{{ $t('ourTeamCaresYou') }}</h1>
            <h2>{{ $t('iMustExplainToYou') }}</h2>
            <PrimaryButton
                class="top__title--btn"
                :label="$t('viewTourPackages')"
                secondary
                @onClick="$router.push({ name: 'tourPackages' })"
            />
        </div>
    </div>
</template>

<script>
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'AboutTopSection',
    components: { PrimaryButton },
    data() {
        return {
            activeTab: 'public',
        }
    },
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'Podcast';
    src: url('../../../assets/fonts/Podcast.ttf');
}
.top {
    margin-top: 12px;
    &__title {
        color: #fff;
        text-align: center;
        margin-bottom: 60px;
        h1 {
            font-family: 'Podcast';
            font-style: normal;
            font-weight: 400;
            font-size: 72px;
            margin-bottom: 24px;
        }
        h2 {
            font-weight: 700;
            font-size: 24px;
            line-height: 33px;
            max-width: 41%;
            margin: 0 auto;
        }
        ::v-deep(&--btn) {
            margin-top: 24px;
            &.secondary-button {
                background-color: transparent;
                color: #fff;
                border-color: #fff;
                font-weight: 600;
                font-size: 20px;
                padding: 14px 24px;
                &:hover {
                    border-color: #fa8b02;
                }
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
    .top {
        &__title {
            h1 {
                font-size: 62px;
            }
            h2 {
                max-width: 50%;
                font-size: 22px;
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
    .top {
        &__title {
            padding: 0 16px;
            h1 {
                font-size: 54px;
            }
            h2 {
                max-width: 70%;
                font-size: 20px;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .top {
        &__title {
            h2 {
                max-width: 80%;
                font-size: 18px;
            }
        }
    }
}

@media only screen and (max-width: 575px) {
    .top {
        &__title {
            h1 {
                font-size: 48px;
            }
        }
    }
}

@media only screen and (max-width: 460px) {
    .top {
        margin-top: 20px;
        &__title {
            h1 {
                font-size: 40px;
            }
            h2 {
                font-size: 16px;
            }
        }
    }
}
</style>
