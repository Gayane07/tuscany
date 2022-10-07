<template>
    <div class="home">
        <img class="home__bg" src="@/assets/images/home-page-bg.png" :alt="$t('homePageImage')" />
        <SearchSection class="home__search flex-center-center" />
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
    position: relative;
    &__bg {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100vh;
        z-index: 10;
    }
    &__search {
        position: absolute;
        z-index: 11;
        width: 100%;
        height: 100%;
    }
}
</style>
