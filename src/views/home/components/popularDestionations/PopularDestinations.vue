<template>
    <div class="carousel">
        <div class="carousel__title">
            <h1>{{ $t('exploreOurDestinations') }}</h1>
        </div>
        <Splide :options="options" class="carousel__slide splide">
            <SplideSlide v-for="(card, index) in data" :key="index">
                <TourCard :card="card" @onCardClick="onClickCard" />
            </SplideSlide>
        </Splide>
    </div>
</template>

<script>
import { sliderOptions } from '@/utils/destinationsSliderOptions'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

// Components
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import TourCard from '@/components/TourCard'

export default {
    name: 'PopularDestinations',
    components: {
        Splide,
        SplideSlide,
        TourCard,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            options: { ...sliderOptions },
        }
    },
    methods: {
        onClickCard(data) {
            this.$router.push({
                name: 'tourPackage',
                params: { id: data.id },
            })
        },
    },
    created() {
        this.options.breakpoints = {
            1359: {
                perPage: 4,
            },
            1199: {},
            991: {
                perPage: 3,
            },
            767: {
                perPage: 2,
            },
            575: {},
            420: {
                perPage: 1,
            },
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
    }
}

@media only screen and (max-width: 1359px) {
    .carousel {
        &__title {
            h1 {
                font-size: 28px;
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
    .carousel {
        &__title {
            h1 {
                font-size: 24px;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .carousel {
        &__slide {
            ::v-deep {
                .splide__arrows {
                    top: -16px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    button {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 575px) {
    .carousel {
        &__title {
            h1 {
                margin-bottom: 18px;
            }
        }
    }
}

@media only screen and (max-width: 420px) {
    .carousel {
        &__slide {
            ::v-deep {
                .splide__arrows {
                    top: 150px;
                    button.splide__arrow {
                        position: relative;
                        &.splide__arrow--prev {
                            left: -10px;
                        }
                        &.splide__arrow--next {
                            right: -10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
