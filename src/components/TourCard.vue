<template>
    <div class="tour__slide--card" @click.stop="$emit('onCardClick', { target: 'card', id: card.id })">
        <div class="cover" :class="{ landscape: landscapeMode }">
            <img :src="card.imgUrl" :alt="$t('image')" />
        </div>
        <div class="flex-col-between-start tour__slide--card__info">
            <h2>{{ card.title }}</h2>
            <div class="flex-start-center">
                <bdi>{{ $t('from') }}</bdi>
                <span class="tour__slide--card__info--amount">
                    {{ card.amount.amount }} <strong>{{ card.amount.currencySymbol }}</strong>
                </span>
            </div>
            <div class="flex-between-center full-width tour__slide--card__info--days">
                <div class="flex-start-center">
                    <img
                        class="date"
                        src="@/assets/icons/date.svg"
                        :alt="$t('dateIcon')"
                        width="18"
                        height="18"
                        style="width: 18px"
                    />
                    <span>{{ card.dateRange }}</span>
                </div>
                <div class="flex-start-center">
                    <img
                        src="@/assets/icons/private.svg"
                        :alt="$t('private')"
                        width="24"
                        height="16"
                        style="width: 24px"
                    />
                    <span>{{ card.peopleCount.min }}-{{ card.peopleCount.max }} PP</span>
                </div>
            </div>
            <div class="description">
                {{ card.description }}
            </div>
            <div
                class="read-more flex-center-center"
                @click.stop="$emit('onCardClick', { target: 'readMore', id: card.id })"
                v-if="showReadMore"
            >
                <span>{{ $t('readMore') }}</span>
                <img src="@/assets/icons/arrow-right-orange.svg" :alt="$t('arrowBack')" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TourCard',
    props: {
        card: {
            type: Object,
            required: true,
        },
        showReadMore: {
            type: Boolean,
            default: false,
        },
        landscapeMode: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
.tour {
    color: #333333;
    &__slide {
        &--card {
            cursor: pointer;
            &:hover {
                .cover {
                    img {
                        transform: scale(1.08);
                        transition: 0.4s;
                    }
                }
            }
            span {
                color: #fa8b02;
            }
            .cover {
                width: 100%;
                max-height: 400px;
                border-radius: 24px;
                overflow: hidden;
                &.landscape {
                    max-height: 300px;
                }
                img {
                    width: 100%;
                    object-fit: cover;
                    transition: 0.4s;
                }
            }
            &__info {
                padding: 0 8px;
                gap: 12px 0;
                margin-top: 16px;
                h2 {
                    font-weight: 700;
                    font-size: 24px;
                }
                bdi {
                    font-size: 18px;
                    margin-right: 10px;
                }
                &--amount {
                    font-weight: 800;
                    font-size: 24px;
                }
                &--days {
                    img.date {
                        filter: invert(65%) sepia(64%) saturate(5447%) hue-rotate(10deg) brightness(101%)
                            contrast(103%);
                    }
                    img {
                        // border-radius: 0;
                        margin-right: 8px;
                        filter: brightness(60%) sepia(100%) hue-rotate(-30deg) saturate(400%) contrast(0.9);
                    }
                }
                div.description {
                    width: 100%;
                    font-weight: 400;
                    font-size: 18px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .read-more {
                    font-weight: 600;
                    font-size: 18px;
                    color: #fa8b02;
                    &:hover {
                        span {
                            text-decoration: underline;
                        }
                    }
                    img {
                        margin-left: 12px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
    .tour__slide--card {
        .cover.landscape {
            max-height: 250px;
        }
    }
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
    .tour {
        &__slide {
            &--card {
                .cover {
                    max-height: 350px;
                }
                &__info {
                    h2 {
                        font-size: 22px;
                    }
                    bdi {
                        font-size: 16px;
                    }
                    &--amount {
                        font-size: 22px !important;
                    }
                    span,
                    div.description {
                        font-size: 14px;
                    }
                    &--days {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .tour {
        &__slide {
            &--card {
                .cover {
                    max-height: 300px;
                    img {
                        width: 100%;
                        height: 300px;
                        object-fit: contain;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 420px) {
}
</style>
