<template>
    <div class="top flex-col-center-center">
        <div class="top__title">
            <h1>{{ $t('enjoyInTheBestWay') }}</h1>
            <h2>{{ $t('enjoyOurServices') }}</h2>
        </div>
        <div class="top__block">
            <div class="top__block--tabs">
                <div
                    class="top__block--tabs__item flex-center-center"
                    :class="{ 'active-tab': tab.active }"
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="changeTab(tab)"
                >
                    <img :src="tab.icon" :alt="tab.label" />
                    <span>{{ tab.label }}</span>
                </div>
            </div>
            <div class="top__block--content flex-between-center">
                <PublicTab v-if="activeTab === 'public'" />
                <PrivateTab v-if="activeTab === 'private'" />
            </div>
        </div>
    </div>
</template>

<script>
import PublicTab from './PublicTab'
import PrivateTab from './PrivateTab'

export default {
    name: 'HomeTopSection',
    components: { PublicTab, PrivateTab },
    data() {
        return {
            activeTab: 'public',
            tabs: [
                {
                    id: 'public',
                    icon: require('@/assets/icons/public.svg'),
                    label: this.$t('publicTours'),
                    active: true,
                },
                {
                    id: 'private',
                    icon: require('@/assets/icons/private.svg'),
                    label: this.$t('privateTours'),
                    active: false,
                },
            ],
        }
    },
    methods: {
        changeTab(tab) {
            if (tab.active) return
            this.activeTab = tab.id
            this.tabs.forEach(tab => (tab.active = false))
            this.tabs.find(el => el.id === tab.id).active = true
        },
    },
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'Podcast';
    src: url('../../../../assets/fonts/Podcast.ttf');
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
            margin-bottom: 16px;
        }
        h2 {
            font-weight: 700;
            font-size: 24px;
        }
    }
    &__block {
        width: 70%;
        padding: 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        &--tabs {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            &__item {
                cursor: pointer;
                padding: 16px;
                background: rgba(255, 255, 255, 0.4);
                user-select: none;
                &.active-tab {
                    background: #fff;
                    color: #fa8b02;
                    img {
                        filter: brightness(60%) sepia(100%) hue-rotate(-30deg) saturate(400%) contrast(0.9); // Orange
                    }
                }

                &:first-child {
                    border-radius: 12px 0px 0px 0px;
                }
                &:last-child {
                    border-radius: 0px 12px 0px 0px;
                }
                img {
                    margin-right: 12px;
                }
            }
        }

        &--content {
            background: #fff;
            border-radius: 0px 12px 12px 12px;
            width: 100%;
            padding: 12px;
        }
    }
}

@media only screen and (max-width: 1599px) {
    .top {
        &__block {
            width: 80%;
            &--tabs {
                font-size: 16px;
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
    .top {
        &__block {
            width: 80%;
            &--tabs {
                font-size: 14px;
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
    .top {
        &__block {
            width: 85%;
            padding: 12px;
            &--tabs {
                &__item {
                    padding: 10px;
                }
            }
            &--content {
                padding: 8px;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .top {
        &__title {
            padding: 0 16px;
            h1 {
                font-size: 62px;
            }
            h2 {
                font-size: 22px;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .top {
        margin-top: -40px;
        &__title {
            h1 {
                font-size: 48px;
            }
            h2 {
                font-size: 18px;
            }
        }
        &__block {
            margin-top: -30px;
            width: 95%;
        }
    }
}
</style>
