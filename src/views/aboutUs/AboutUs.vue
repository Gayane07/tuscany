<template>
    <div class="overlay" v-if="homePageLoading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="homePageError">
        <GenericError @reFetchData="fetchHomePageData" />
    </div>
    <div class="about" v-else>
        <section class="flex-center-center about__intro">
            <img class="about__intro--bg" src="@/assets/images/about-us-bg.png" :alt="$t('aboutUsImage')" />
            <TopSection class="about__intro--wrapper flex-center-center" />
        </section>

        <section class="container about__statistics">
            <Statistics
                :statistics="homePageData.statistics"
                :imgUrl="require('@/assets/images/statistics/image-2.png')"
                imageRadius="24"
                imageWidth="600"
                :title="$t('weAreTheCenterOfLucca')"
                :description="$t('weAreInTheCenter')"
            />
        </section>

        <section class="about__experience">
            <Experience />
        </section>

        <section class="container about__customers">
            <CustomersSays :data="homePageData.customerSays" />
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import GenericError from '@/components/GenericError'
import TopSection from './components/TopSection'
import Statistics from '../home/components/statistics/Statistics'
import Experience from './components/Experience'
import CustomersSays from '../home/components/customers/CustomersSays'

export default {
    name: 'AboutUs',
    components: { GenericError, TopSection, Statistics, Experience, CustomersSays },
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

.about {
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
        &--wrapper {
            z-index: 11;
            width: 100%;
            height: 100%;
        }
    }

    &__statistics {
        margin-top: 120px;
        margin-bottom: 120px;
    }

    &__experience {
        width: 100%;
        padding: 83px 0;
        background-image: linear-gradient(to right, #fda674, #ffcc9c, #fda674);
    }

    &__customers {
        margin-top: 80px;
        margin-bottom: 100px;
    }
}

@media only screen and (max-width: 1550px) {
    .about {
        &__statistics {
            gap: 0 40px;
            ::v-deep() {
                img {
                    width: 400px;
                    border-radius: 24px;
                }
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
    .about {
        &__statistics {
            margin-top: 80px;
            margin-bottom: 80px;
            ::v-deep() {
                img {
                    width: 300px;
                }
                .statistics {
                    justify-content: flex-start;
                    &__info {
                        width: 100%;
                    }
                    &__nums--wrapper {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .about {
        &__statistics {
            ::v-deep() {
                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>
