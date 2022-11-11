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
    gap: 0 30px;
    &__item {
        gap: 20px 0;
        max-width: 300px;
        img {
            width: 100%;
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

@media only screen and (max-width: 1850px) {
    .services {
        flex-wrap: wrap;
        gap: 32px;
        &__item {
            width: 100%;
            img {
                width: 100%;
            }
        }
    }
}

@media only screen and (max-width: 1599px) {
    .services {
        &__item {
            p {
                font-size: 22px;
            }
            span {
                font-size: 16px;
            }
        }
    }
}
@media only screen and (max-width: 1359px) {
}

@media only screen and (max-width: 1199px) {
    .services {
        &__item {
            p {
                font-size: 18px;
            }
            span {
                font-size: 14px;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
}

@media only screen and (max-width: 767px) {
    .services {
        flex-wrap: nowrap;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }
}

@media only screen and (max-width: 575px) {
}
</style>
