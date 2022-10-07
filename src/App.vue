<template>
    <div class="app">
        <Header />
        <router-view class="app-page"></router-view>
        <Footer />
    </div>
</template>

<script>
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default {
    name: 'App',
    components: { Header, Footer },
    // data() {
    //     return {
    //         headerHeight: 155,
    //     }
    // },
    // methods: {
    //     getHeaderHeight() {
    //       this.headerHeight = document.querySelector('nav').clientHeight
    //     },
    // },
    // mounted() {
    //     this.getHeaderHeight()
    // },
}
</script>

<style lang="scss">
@import url('./styles/_defaults.scss');
.app-page {
    min-height: 100vh;
}
</style>
