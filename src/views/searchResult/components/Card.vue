<template>
    <div class="card flex-between-center">
        <div class="card__img">
            <img :src="card.imgUrl" :alt="$t('cardImage')" />
        </div>
        <div class="card__desc flex-between-center">
            <div class="card__desc--features flex-col-between-start">
                <h2>{{ card.title }}</h2>
                <div class="card__desc--features__items">
                    <div class="flex-start-center" v-for="(item, index) in features" :key="index">
                        <img :src="item.imgUrl" :alt="$t('icon')" />
                        <span>
                            <strong>{{ item.label }}:</strong>
                        </span>
                        <span>&nbsp;{{ item.value }}</span>
                    </div>
                </div>
            </div>
            <div class="card__desc--book">
                <span>
                    {{ $t('from') }}
                    <strong>{{ card.amount.value + ' ' + card.amount.currencySymbol }}</strong>
                </span>
                <PrimaryButton
                    class="card__desc--book__btn"
                    :label="$t('viewTour')"
                    secondary
                    @onClick="$router.push({ name: 'tourPackage', params: { id: card.id } })"
                />
                <PrimaryButton class="card__desc--book__btn" :label="$t('bookNow')" />
            </div>
        </div>
    </div>
</template>

<script>
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'SearchCard',
    components: { PrimaryButton },
    props: {
        card: {
            type: Object,
            required: true,
        },
        features: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    border-bottom: 1px solid silver;
    padding-bottom: 16px;
    &__img {
        width: 100%;
        max-width: 340px;
        border-radius: 24px;
        overflow: hidden;
        margin-right: 16px;
        img {
            width: 100%;
            border-radius: 24px;
        }
    }
    &__desc {
        width: 100%;
        align-items: flex-end;
        &--features {
            &__items {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px 0;
                margin-top: 40px;
                img {
                    margin-right: 12px;
                }
            }
        }
        &--book {
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            flex-direction: column;
            gap: 16px 0;
            span {
                margin-bottom: 32px;
                font-size: 24px;
                font-weight: 600;
                strong {
                    font-weight: 800;
                    font-size: 32px;
                }
            }
            ::v-deep {
                button {
                    white-space: nowrap;
                }
            }
        }
    }
}

@media only screen and (max-width: 1530px) {
    .card {
        &__img {
            max-width: 260px;
        }

        &__desc {
            &--features {
                width: 80%;
                &__items {
                    margin-top: 16px;
                    gap: 8px 0;
                }
            }
        }
    }
}

@media only screen and (max-width: 1200px) {
    .card {
        &__desc {
            &--features {
                font-size: 14px;
            }
            &--book {
                span {
                    font-size: 18px;
                    strong {
                        font-size: 24px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .card {
        flex-direction: column;
        width: 45%;
        &__img {
            max-width: none;
        }
        &__desc {
            flex-direction: column;
            align-items: flex-start;
            &--features {
                width: 100%;
                &__items {
                    display: flex;
                    flex-direction: column;
                }
            }

            &--book {
                width: 100%;
                justify-content: space-between;
                margin-top: 16px;
                gap: 8px 0;
                span {
                    margin: 0;
                }
                &__btn {
                    width: 100%;
                }
            }
        }
    }
}

@media only screen and (max-width: 576px) {
    .card {
        width: 100%;
        &__img {
            margin: 0;
        }

        &__desc {
            &--book {
                span {
                    font-size: 14px;
                    strong {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
