<template>
    <div class="overlay" v-if="homePageLoading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="homePageError">
        <GenericError showFetchButton @reFetchData="fetchHomePageData" />
    </div>
    <div class="home" v-else>
        <section class="flex-center-center home__intro">
            <img class="home__intro--bg" src="@/assets/images/home-page-bg.png" :alt="$t('homePageImage')" />
            <TopSection class="home__intro--search flex-center-center" />
        </section>

        <section class="container home__destination">
            <PopularDestinations :data="homePageData.popularDestinations" />
        </section>

        <section class="container home__statistics">
            <Statistics
                :statistics="homePageData.statistics"
                :imgUrl="require('@/assets/images/statistics/image-1.png')"
                imageRadius="24"
                imageWidth="400"
                :title="$t('weAreTheBestCompany')"
                :description="$t('afterDecidesOfExperience')"
            />
        </section>

        <section class="home__offer">
            <SpecialOffer />
        </section>

        <section class="container home__services">
            <Services />
        </section>

        <section class="home__book">
            <Book />
        </section>

        <section class="container home__packages">
            <PopularPackages :packages="homePageData.packages" />
        </section>

        <section class="container home__customers">
            <CustomersSays :data="homePageData.customerSays" />
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import GenericError from '@/components/GenericError'
import TopSection from './components/search/TopSection'
import PopularDestinations from './components/popularDestionations/PopularDestinations'
import Statistics from './components/statistics/Statistics'
import SpecialOffer from './components/offers/SpecialOffer'
import Services from './components/services/Services'
import Book from './components/book/Book'
import PopularPackages from './components/packages/PopularPackages.vue'
import CustomersSays from './components/customers/CustomersSays'

export default {
    name: 'HomePage',
    components: {
        GenericError,
        TopSection,
        PopularDestinations,
        Statistics,
        SpecialOffer,
        Services,
        Book,
        PopularPackages,
        CustomersSays,
    },
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
.home {
    height: 100%;
    &__intro {
        position: relative;
        height: 100vh;
        &--bg {
            position: absolute;
            object-fit: cover;
            width: 100%;
            height: 100%;
            z-index: 10;
        }
        &--search {
            z-index: 11;
            width: 100%;
            height: 100%;
        }
    }

    &__destination {
        margin: 120px auto;
    }

    &__statistics {
        margin-bottom: 280px;
    }

    &__offer,
    &__book {
        width: 100%;
        padding: 60px 0;
        background-image: linear-gradient(to right, #fda674, #ffcc9c, #fda674);
    }

    &__services {
        margin-top: 120px;
        margin-bottom: 80px;
    }

    &__packages {
        margin-top: 150px;
        margin-bottom: 120px;
    }

    &__customers {
        margin-bottom: 160px;
    }
}

@media only screen and (max-width: 1559px) {
    .home {
        &__destination {
            margin-top: 50px;
            margin-bottom: 80px;
        }
        &__statistics {
            margin-bottom: 200px;
        }
        &__packages {
            margin-top: 80px;
            margin-bottom: 60px;
        }
        &__customers {
            margin-bottom: 60px;
        }
    }
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
    .home {
        &__statistics {
            margin-bottom: 60px;
        }
        &__services {
            margin-top: 60px;
            margin-bottom: 60px;
        }
        &__customers {
            margin-bottom: 60px;
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .home {
        &__destination {
            margin-top: 32px;
        }

        &__statistics {
            margin-bottom: 32px;
        }

        &__offer,
        &__book {
            padding: 16px 0;
        }

        &__services {
            margin-top: 32px;
            margin-bottom: 32px;
        }

        &__packages {
            margin-top: 32px;
            margin-bottom: 24px;
        }

        &__customers {
            margin-bottom: 24px;
        }
    }
}
</style>
