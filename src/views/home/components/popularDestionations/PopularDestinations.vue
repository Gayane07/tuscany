<template>
    <div class="carousel">
        <div class="carousel__title">
            <h1>{{ $t('exploreOurDestinations') }}</h1>
        </div>
        <Splide :options="options" class="carousel__slide splide">
            <SplideSlide v-for="(card, index) in data" :key="index">
                <div class="carousel__slide--card">
                    <div class="cover">
                        <img :src="card.imgUrl" :alt="$t('image')" />
                    </div>
                    <div class="flex-col-between-start carousel__slide--card__info">
                        <h2>{{ card.title }}</h2>
                        <div class="flex-start-center">
                            <bdi>{{ $t('from') }}</bdi>
                            <span class="carousel__slide--card__info--amount">
                                {{ card.amount.amount }} <strong>{{ card.amount.currencySymbol }}</strong>
                            </span>
                        </div>
                        <div class="flex-between-center full-width carousel__slide--card__info--days">
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
                    </div>
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script>
import { sliderOptions } from '@/utils/destinationsSliderOptions'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

// Components
import { Splide, SplideSlide } from '@splidejs/vue-splide'

export default {
    name: 'PopularDestinations',
    components: {
        Splide,
        SplideSlide,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            options: sliderOptions,
        }
    },
}
</script>

<style lang="scss" scoped>
.carousel {
    color: #333333;
    &__title {
        h1 {
            font-weight: 800;
            font-size: 32px;
            margin-bottom: 60px;
        }
    }
    &__slide {
        ::v-deep {
            .splide__arrows {
                position: relative;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 0 20px;
                top: -56px;
                height: 0;
                button {
                    position: static;
                    background-color: #efefef;
                    width: 50px;
                    height: 50px;
                    transition: all 0.2s;
                    &:hover {
                        transition: all 0.2s;
                        background-color: #fa8b02;
                        svg {
                            fill: white;
                        }
                    }
                }
            }
        }
        &--card {
            max-height: 590px;
            overflow: hidden;
            cursor: pointer;
            &:hover {
                .cover {
                    img {
                        transform: scale(1.05);
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
            }
        }
    }
}
</style>
