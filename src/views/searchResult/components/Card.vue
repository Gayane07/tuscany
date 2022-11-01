<template>
    <div class="card">
        <div class="card__image--block">
            <img src="" alt="card123">
        </div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    methods: {
    },
    computed: {
    },
    created() {
    },
}
</script>

<style lang="scss" scoped>
    .card{
        border-bottom: 1px solid #EFEFEF;

        &__image--block{
            width: 340px;
            height: 265px;
            border-radius: 24px;

            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
