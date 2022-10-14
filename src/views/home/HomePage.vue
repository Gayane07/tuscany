<template>
    <div class="overlay" v-if="homePageLoading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="homePageError">
        <GenericError @reFetchData="fetchHomePageData" />
    </div>
    <div class="home" v-else>
        <section class="flex-center-center home__intro">
            <img class="home__intro--bg" src="@/assets/images/home-page-bg.png" :alt="$t('homePageImage')" />
            <SearchSection class="home__intro--search flex-center-center" />
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
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import GenericError from '@/components/GenericError'
import SearchSection from './components/search/SearchSection'
import PopularDestinations from './components/popularDestionations/PopularDestinations'
import Statistics from './components/statistics/Statistics'
import SpecialOffer from './components/offers/SpecialOffer'

export default {
    name: 'HomePage',
    components: { GenericError, SearchSection, PopularDestinations, Statistics, SpecialOffer },
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

    &__offer {
        width: 100%;
        padding: 60px 0;
        background-image: linear-gradient(to right, #fda674, #ffcc9c, #fda674);
    }
}
</style>
