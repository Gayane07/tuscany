<template>
    <div class="home">
        <section class="flex-center-center home__intro">
            <img class="home__bg" src="@/assets/images/home-page-bg.png" :alt="$t('homePageImage')" />
            <SearchSection class="home__search flex-center-center" />
        </section>
    </div>
</template>

<script>
import SearchSection from './components/SearchSection'
export default {
    name: 'HomePage',
    components: { SearchSection },
}
</script>

<style lang="scss" scoped>
.home {
    &__intro {
        position: relative;
        height: 100vh;
    }
    &__bg {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    &__search {
        z-index: 11;
        width: 100%;
        height: 100%;
    }
}
</style>
