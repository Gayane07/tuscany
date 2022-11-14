<template>
    <div class="overlay" v-if="loading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="error">
        <GenericError @reFetchData="fetchTickets" />
    </div>
    <div class="container tickets" v-else :style="{ paddingTop: headerHeight + 'px' }">
        <h2 v-if="!isAuthenticated">Please sign in to see tour tickets</h2>
        <div class="tickets__wrapper" v-else>
            <h1>My Tickets</h1>
            <div class="flex-col-center-center tickets__wrapper--empty" v-if="!tickets.length">
                <img src="@/assets/images/tourists.png" :alt="$t('touristsImage')" />
                <span>{{ $t('youDontHaveTickets') }}</span>
            </div>
            <div class="tickets__wrapper--table" :class="{ shadow: offsetWidth < 941 }" v-else>
                <TicketsTable :tickets="tickets" />
            </div>

            <PopularDestinations
                v-if="Object.keys(homePageData).length"
                :data="homePageData.popularDestinations"
                :title="$t('tourPackages')"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import GenericError from '@/components/GenericError.vue'
import TicketsTable from './components/TicketsTable'
import PopularDestinations from '../home/components/popularDestionations/PopularDestinations'

export default {
    name: 'MyTickets',
    components: { GenericError, TicketsTable, PopularDestinations },
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
        offsetWidth: {
            type: Number,
            default: 1920,
        },
    },
    data() {
        return {
            isAuthenticated: false,
        }
    },
    methods: {
        ...mapActions('myTicketsModule', ['fetchTickets']),
        ...mapActions('homePageModule', ['fetchHomePageData']),
    },
    computed: {
        ...mapGetters('myTicketsModule', ['tickets', 'loading', 'error']),
        ...mapGetters('homePageModule', ['homePageData']),
    },
    created() {
        this.isAuthenticated = !!localStorage.getItem('token')
        if (this.isAuthenticated) {
            this.fetchTickets()
            this.fetchHomePageData()
        }
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

.tickets {
    h2 {
        width: 100%;
        margin-top: 80px;
        text-align: center;
    }
    h1 {
        margin-top: 32px;
    }

    &__wrapper {
        &--empty {
            margin-bottom: 64px;
            img {
                width: 300px;
                object-fit: cover;
            }
            span {
                font-weight: 400;
                font-size: 20px;
                color: #333333;
                margin-top: 32px;
            }
        }
        &--table {
            margin: 32px 0 64px;
            overflow-x: auto;
            &.shadow {
                box-shadow: rgba(0, 0, 0, 0.05) -20px 0px 10px -12px inset,
                    rgba(0, 0, 0, 0.05) -20px 0px 10px -18px inset;
            }
        }
    }
}

@media only screen and (max-width: 1559px) {
    .tickets {
        &__wrapper {
            &--empty {
                span {
                    font-size: 18px;
                }
            }
        }
    }
}

@media only screen and (max-width: 576px) {
    .tickets {
        &__wrapper {
            &--empty {
                span {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
