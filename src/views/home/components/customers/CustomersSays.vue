<template>
    <div class="carousel">
        <div class="carousel__title">
            <h1>{{ $t('happyCustomerSays') }}</h1>
        </div>
        <Splide :options="options" class="carousel__slide splide">
            <SplideSlide v-for="(card, index) in data" :key="index">
                <div class="carousel__slide--card full-width">
                    <div class="flex-col-center-center carousel__slide--card__user">
                        <img :src="card.customerImg" :alt="$t('userImg')" />
                        <span>{{ card.customerName }}</span>
                    </div>
                    <div class="flex-start-center">
                        <img src="@/assets/icons/quote.svg" :alt="$t('quoteIcon')" class="quote" />
                        <img src="@/assets/icons/quote.svg" :alt="$t('quoteIcon')" class="quote" />
                    </div>
                    <div class="flex-start-center">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti iusto sequi
                            ratione dicta sint, distinctio officia debitis, amet doloribus necessitatibus ipsa
                            tenetur? In amet nam placeat recusandae, incidunt accusamus.
                        </p>
                    </div>
                    <div class="flex-end-center">
                        <img src="@/assets/icons/quote.svg" :alt="$t('quoteIcon')" class="quote" />
                        <img src="@/assets/icons/quote.svg" :alt="$t('quoteIcon')" class="quote" />
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
    name: 'CustomerSays',
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
            options: { ...sliderOptions },
        }
    },
    created() {
        this.options.perPage = 2
        this.options.breakpoints = {
            767: {
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

        &--card {
            padding: 30px;
            background: #ffffff;
            border: 1px solid #efefef;
            border-radius: 24px;
            p {
                font-weight: 400;
                font-size: 18px;
                color: #000;
            }
            &__user {
                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 15px;
                }
                span {
                    color: #333333;
                    font-weight: 400;
                    font-size: 18px;
                }
            }
            .quote {
                filter: opacity(0.08);
                margin: 10px 0;
            }
            p {
                padding: 0 24px;
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
        &__slide {
            &--card {
                p {
                    font-size: 14px;
                }
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
}
</style>
