<template>
    <div class="overlay" v-if="homePageLoading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="homePageError">
        <GenericError @reFetchData="fetchHomePageData" />
    </div>
    <div class="container tickets" v-else :style="{ paddingTop: headerHeight + 'px' }">
        <h1 v-if="!isAuthenticated">Please sign in to see tour tickets</h1>
        <div v-else>my tickets</div>
    </div>
</template>

<script>
import GenericError from '@/components/GenericError.vue'

export default {
    name: 'MyTickets',
    components: { GenericError },
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            isAuthenticated: false,
            homePageLoading: false,
            homePageError: false,
        }
    },
    methods: {
        fetchHomePageData() {
            // TODO
        },
    },
    created() {
        this.isAuthenticated = !!localStorage.getItem('token')
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
    h1 {
        width: 100%;
        margin-top: 80px;
        text-align: center;
    }
}
</style>
