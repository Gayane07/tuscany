<template>
    <div class="result">
        <div class="result--block container">
            <h1>{{ $t('searchResult') }}</h1>
            <div class="card--block">
                <Card />
            </div>
        </div>
    </div>
</template>

<script>
import Card from './components/Card.vue'

export default {
    name: 'SearchResult',
    components: {Card},
}
</script>

<style lang="scss" scoped>
    .result{
        padding-top: 117px;

        &--block{
            padding-top: 120px;
            padding-bottom: 160px;

            h1 {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 800;
                font-size: 32px;
                line-height: 44px;
                color: #333333;
            }

            .card--block{
                margin-top: 30px;
            }
        }
    }
</style>
