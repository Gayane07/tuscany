<template>
    <div class="overlay" v-if="searchLoading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="searchError">
        <GenericError showFetchButton @reFetchData="fetchHomePageData" />
    </div>
    <div class="result" v-else>
        <div class="result--block container">
            <h1>{{ $t('searchResult') }}</h1>
            <div class="card--block" v-if="searchData.length">
                <Card v-for="card in searchData" :key="card.id" :card="card" :features="features" />
            </div>
            <div v-else>No Items</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import GenericError from '@/components/GenericError'
import Card from './components/Card'

export default {
    name: 'SearchResult',
    components: { GenericError, Card },
    data() {
        return {
            payload: {},
            features: [
                {
                    imgUrl: require('@/assets/icons/packages/companion.svg'),
                    label: 'Number of group',
                    value: '15-30',
                },
                {
                    imgUrl: require('@/assets/icons/packages/person.svg'),
                    label: 'Duration',
                    value: '15 hours and 45 minutes',
                },
                {
                    imgUrl: require('@/assets/icons/packages/ticket.svg'),
                    label: 'Entry Fees',
                    value: 'Lorem ipsum',
                },
                {
                    imgUrl: require('@/assets/icons/packages/driver.svg'),
                    label: 'Guide service',
                    value: 'Included',
                },
                {
                    imgUrl: require('@/assets/icons/packages/like-hand.svg'),
                    label: 'Language',
                    value: 'English, Italian',
                },
                {
                    imgUrl: require('@/assets/icons/packages/ticket.svg'),
                    label: 'Entry Fees',
                    value: 'Lorem ipsum',
                },
                {
                    imgUrl: require('@/assets/icons/packages/bus.svg'),
                    label: 'Entry Transportation',
                    value: 'Bus',
                },
                {
                    imgUrl: require('@/assets/icons/packages/driver.svg'),
                    label: 'Guide service',
                    value: 'Included',
                },
            ],
        }
    },
    methods: {
        ...mapActions('searchModule', ['handleSearch']),
        handleFetchData() {
            this.handleSearch(this.payload)
        },
    },
    computed: {
        ...mapGetters('searchModule', ['searchData', 'searchLoading', 'searchError']),
    },
    created() {
        this.payload = { ...this.$route.query }
        if (!this.searchData) {
            this.handleFetchData()
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

.result {
    padding-top: 120px;

    &--block {
        padding-top: 120px;
        padding-bottom: 160px;

        h1 {
            font-weight: 800;
            font-size: 32px;
            color: #333333;
        }

        .card--block {
            margin-top: 60px;
            display: flex;
            flex-direction: column;
            gap: 30px 0;
        }
    }
}

@media only screen and (max-width: 1530px) {
    .result {
        padding-top: 40px;
        &--block {
            padding-bottom: 32px;
        }
        .card--block {
            margin-top: 32px;
        }
    }
}

@media only screen and (max-width: 991px) {
    .result {
        h1 {
            font-size: 28px;
        }
        &--block {
            padding-top: 80px;
        }
        .card--block {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
}

@media only screen and (max-width: 576px) {
    .result {
        h1 {
            font-size: 24px;
        }
        &--block {
            padding-top: 32px;
        }
        .card--block {
            margin-top: 24px;
        }
    }
}
</style>
