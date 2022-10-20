<template>
    <div class="container flex-between-center exp">
        <div class="exp__wrapper flex-between-center">
            <div class="flex-col-center-center exp__wrapper--item" v-for="(item, index) in exp" :key="index">
                <img :src="item.imgUrl" :alt="$t('icon')" />
                <h3>{{ item.label }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Experience',
    data() {
        return {
            exp: [
                { imgUrl: require('@/assets/icons/addresses.svg'), label: this.$t('completePackages') },
                { imgUrl: require('@/assets/icons/medal.svg'), label: this.$t('yearsOfExperience') },
                { imgUrl: require('@/assets/icons/referee.svg'), label: this.$t('expertGuides') },
                { imgUrl: require('@/assets/icons/cash.svg'), label: this.$t('guaranteedFun') },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.exp {
    &__wrapper {
        gap: 0 24px;

        &--item {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            padding: 30px;
            width: 25%;
            height: 190px;
            text-align: center;
            font-weight: 600;
            font-size: 20px;
            justify-content: flex-start;
            img {
                margin-bottom: 16px;
            }
        }
    }
}

@media only screen and (max-width: 1550px) {
    .exp {
        &__wrapper {
            &--item {
                font-size: 18px;
            }
        }
    }
}
@media only screen and (max-width: 1359px) {
}

@media only screen and (max-width: 1199px) {
    .exp {
        &__wrapper {
            &--item {
                font-size: 16px;
                img {
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .exp {
        &__wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            &--item {
                width: 100%;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .exp {
        &__wrapper {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px 0;
        }
    }
}

@media only screen and (max-width: 420px) {
}
</style>
