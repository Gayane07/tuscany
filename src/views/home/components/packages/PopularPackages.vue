<template>
    <div class="flex-col-between-start package">
        <h1>{{ $t('popularPackages') }}</h1>
        <div class="flex-between-start full-width wrapper">
            <div class="package__item" v-for="item in packages" :key="item.id">
                <img class="package__item--img" :src="item.imgUrl" :alt="$t('packageImg')" />
                <div class="flex-col-between-start package__info">
                    <h2>{{ item.title }}</h2>
                    <div class="package__info--amount" :data-after="'/' + $t('day')">
                        <div class="flex-between-start">
                            <span>{{ item.amount.currencySymbol }}</span>
                            <h2>{{ item.amount.value }}</h2>
                        </div>
                    </div>
                    <div
                        v-for="(itm, index) in item.options"
                        :key="index"
                        class="flex-start-center package__info--item"
                    >
                        <img
                            :src="require(`@/assets/icons/packages/${itm.icon.name}.svg`)"
                            :alt="$t('icon')"
                            :width="itm.icon.width"
                            :height="itm.icon.height"
                        />
                        <span>{{ itm.label }}</span>
                    </div>
                    <PrimaryButton
                        class="full-width package__info--book"
                        secondary
                        :label="$t('bookNow')"
                        @onClick="goToCurrentPackage(item.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PrimaryButton from '@/components/PrimaryButton'
export default {
    name: 'PopularPackages',
    props: {
        packages: {
            type: Array,
            default: () => [],
        },
    },
    components: { PrimaryButton },
    methods: {
        goToCurrentPackage(id) {
            this.$router.push({
                name: 'tourPackage',
                params: { id },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.package {
    color: #333333;
    h1 {
        margin-bottom: 60px;
        font-weight: 800;
        font-size: 32px;
    }
    &__item {
        width: 24%;
        border-radius: 24px;
        border: 1px solid rgba(192, 192, 192, 0.3);
        overflow: hidden;
        background-color: #fff;
        &--img {
            width: 100%;
            height: 340px;
            object-fit: cover;
        }
    }
    &__info {
        padding: 25px;
        background: #ffffff;
        border-radius: 0px 0px 24px 24px;
        h2 {
            font-weight: 800;
            font-size: 20px;
            margin-bottom: 16px;
        }
        &--amount {
            position: relative;
            &::after {
                content: attr(data-after);
                position: absolute;
                right: -38px;
                bottom: 27px;
            }
            span {
                font-weight: 400;
                font-size: 20px;
                color: #33333380;
                margin-top: 4px;
                margin-right: 6px;
            }
            h2 {
                font-weight: 700;
                font-size: 48px;
                color: #fa8b02;
            }
        }

        &--item {
            margin-bottom: 32px;
            font-weight: 400;
            font-size: 18px;
            img {
                margin-right: 16px;
            }
        }

        &--book {
            width: 100%;
            font-weight: 600;
            font-size: 20px;
        }
    }
}

@media only screen and (max-width: 1359px) {
    .package {
        &__info {
            h2 {
                font-size: 18px;
            }
            &--amount {
                h2 {
                    font-size: 22px;
                }
                span {
                    font-size: 14px;
                    margin-top: -4px;
                }
                &::after {
                    content: attr(data-after);
                    position: absolute;
                    right: -38px;
                    bottom: 16px;
                    font-size: 12px;
                }
            }
            &--item {
                font-size: 14px;
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
    .package {
        h1 {
            font-size: 28px;
        }
    }
}

@media only screen and (max-width: 991px) {
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }
    .package {
        &__item {
            width: 100%;
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .wrapper {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
    }
    .package {
        &__item {
            width: 100%;
        }
    }
}
</style>
