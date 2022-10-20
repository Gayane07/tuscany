<template>
    <div class="overlay" v-if="homePageLoading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="homePageError">
        <GenericError @reFetchData="fetchHomePageData" />
    </div>
    <div class="tour" :style="{ paddingTop: headerHeight + 'px' }" v-else>
        <section class="tour__cards container">
            <h1>{{ $t('tourPackages') }}</h1>
            <div class="tour__cards--wrapper">
                <div v-for="card in homePageData.popularDestinations" :key="card.id">
                    <TourCard showReadMore :card="card" />
                </div>
            </div>
        </section>

        <section class="tour__cards container">
            <h1>{{ $t('services') }}</h1>
            <div class="services tour__cards--wrapper">
                <div v-for="card in homePageData.popularDestinations" :key="card.id">
                    <TourCard showReadMore landscapeMode :card="card" />
                </div>
            </div>
        </section>

        <section class="tour__book">
            <Book />
        </section>

        <section class="container tour__customers">
            <CustomersSays :data="homePageData.customerSays" />
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import TourCard from '@/components/TourCard'
import Book from '../home/components/book/Book'
import CustomersSays from '../home/components/customers/CustomersSays.vue'

export default {
    name: 'TourPackages',
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
    components: { TourCard, Book, CustomersSays },
    methods: {
        ...mapActions('homePageModule', ['fetchHomePageData']),
    },
    computed: {
        ...mapGetters('homePageModule', ['homePageData', 'homePageLoading', 'homePageError']),
    },
    created() {
        this.fetchHomePageData()
    },
}
</script>

<style lang="scss" scoped>
.overlay {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    span.spinner {
        border-color: #fa8b02;
        width: 100px;
        height: 100px;
    }
}

.tour {
    &__cards {
        margin-top: 80px;
        margin-bottom: 80px;
        h1 {
            font-weight: 800;
            font-size: 32px;
            color: #333333;
            margin-bottom: 60px;
        }
        &--wrapper {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 70px 32px;
            &.services {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    }

    &__book {
        width: 100%;
        padding: 60px 0;
        background-image: linear-gradient(to right, #fda674, #ffcc9c, #fda674);
    }

    &__customers {
        margin-top: 60px;
        margin-bottom: 60px;
    }
}

@media only screen and (max-width: 1359px) {
    .tour {
        &__cards {
            h1 {
                font-size: 28px;
                margin-bottom: 40px;
            }
            &--wrapper {
                grid-template-columns: repeat(3, 1fr);
                gap: 60px 24px;
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
    .tour {
        &__cards {
            margin-top: 60px;
            margin-bottom: 60px;
        }
    }
}

@media only screen and (max-width: 991px) {
    .tour {
        &__cards {
            margin-top: 40px;
        }
    }
}

@media only screen and (max-width: 767px) {
    .tour {
        &__cards {
            &--wrapper {
                grid-template-columns: repeat(2, 1fr);
                &.services {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        }
    }
}

@media only screen and (max-width: 575px) {
    .tour {
        &__cards {
            margin-top: 20px;
            &--wrapper {
                grid-template-columns: repeat(1, 1fr);
                &.services {
                    grid-template-columns: repeat(1, 1fr);
                }
                ::v-deep {
                    .cover {
                        img {
                            width: 100%;
                            object-fit: cover;
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 420px) {
}
</style>
