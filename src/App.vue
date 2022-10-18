<template>
    <div class="app">
        <Header />
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
        }
    },
    methods: {
        getHeaderHeight() {
            this.headerHeight = document.querySelector('header').clientHeight
        },
    },
    mounted() {
        this.getHeaderHeight()
        window.addEventListener('resize', this.getHeaderHeight) // Get the height when the user switches to landscape mode for example.
    },
    watch: {
        $route() {
            window.scrollTo({ top: 0, behavior: 'auto' }) // Scroll to top after route change.
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
