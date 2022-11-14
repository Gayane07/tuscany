<template>
    <div class="app">
        <Header :offsetWidth="offsetWidth" />
        <router-view class="app-page" :headerHeight="headerHeight"></router-view>
        <Footer />
    </div>
</template>

<script>
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default {
    name: 'App',
    components: { Header, Footer },
    data() {
        return {
            headerHeight: 155,
            offsetWidth: 1920
        }
    },
    methods: {
        getHeaderDimensions() {
            this.headerHeight = document.querySelector('header').clientHeight
            this.offsetWidth = document.body.offsetWidth
        },
    },
    mounted() {
        this.getHeaderDimensions()
        window.addEventListener('resize', this.getHeaderDimensions)
    },
    watch: {
        $route() {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'auto' }) // Scroll to top after route change.
            }, 0);
        },
    },
}
</script>

<style lang="scss">
@import url('./styles/_defaults.scss');
.app-page {
    min-height: 100vh;
}
</style>
