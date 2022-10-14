<template>
    <div class="flex-between-start services">
        <div class="flex-col-between-start services__item" v-for="(item, index) in services" :key="index">
            <img :src="item.imgUrl" :аlt="$t('serviceImg')" />
            <p>{{ item.title }}</p>
            <span>{{ item.description }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ServicesSection',
    data() {
        return {
            services: [
                {
                    imgUrl: 'https://picsum.photos/id/250/200/300',
                    title: this.$t('bikeAndRickshawRental'),
                    description: this.$t('bookYourVehicle'),
                },
                {
                    imgUrl: 'https://picsum.photos/id/251/200/300',
                    title: this.$t('guidedTourOfCountryside'),
                    description: this.$t('liveTheReal'),
                },
                {
                    imgUrl: 'https://picsum.photos/id/252/200/300',
                    title: this.$t('taxiService'),
                    description: this.$t('doYouNeedNotOnly'),
                },
                {
                    imgUrl: 'https://picsum.photos/id/253/200/300',
                    title: this.$t('busPackage'),
                    description: this.$t('busDescription'),
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.services {
    color: #333333;
    gap: 0 33px;
    &__item {
        gap: 20px 0;
        max-width: 330px;
        img {
            width: 330px;
            height: 300px;
            object-fit: cover;
            border-radius: 24px;
        }
        p {
            font-weight: 700;
            font-size: 24px;
        }
        span {
            font-weight: 400;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>
