export default {
    data() {
        return {
            items: [
                {
                    title: this.$t('services'),
                    childs: [
                        { label: this.$t('bikeAndRickshawRental'), link: 'bikeAndRickshawRental' },
                        { label: this.$t('guidedTours'), link: 'guidedTours' },
                        { label: this.$t('guidedBike'), link: 'guidedBike' },
                        { label: this.$t('tripInTheTuscan'), link: 'tripInTheTuscan' },
                        {
                            label: this.$t('transportationWithLuxuryCars'),
                            link: 'transportationWithLuxuryCars',
                        },
                        { label: this.$t('wineToursByBus'), link: 'wineToursByBus' },
                    ],
                },
                {
                    title: this.$t('home'),
                    childs: [
                        { label: this.$t('home'), link: '/' },
                        { label: this.$t('aboutUs'), link: 'about-us' },
                        { label: this.$t('tourPackages'), link: 'tour-packages' },
                    ],
                },
                {
                    title: this.$t('help'),
                    childs: [
                        { label: this.$t('termsOfUse'), link: 'termsOfUse' },
                        { label: this.$t('privacyPolicy'), link: 'privacyPolicy' },
                    ],
                },
                {
                    title: this.$t('contacts'),
                    childs: [
                        {
                            label: this.$t('piazzaNapoleone'),
                            link: 'piazzaNapoleone',
                            iconUrl: require('@/assets/icons/location.svg'),
                        },
                        {
                            label: this.$t('phoneNumber'),
                            link: 'phoneNumber',
                            iconUrl: require('@/assets/icons/phone.svg'),
                        },
                        {
                            label: this.$t('email'),
                            link: 'email',
                            iconUrl: require('@/assets/icons/message.svg'),
                        },
                    ],
                },
                {
                    title: this.$t('socialMedia'),
                    isLast: true,
                    childs: [
                        { label: '', link: 'twitter', iconUrl: require('@/assets/icons/twitter.svg') },
                        { label: '', link: 'fb', iconUrl: require('@/assets/icons/fb.svg') },
                        { label: '', link: 'instagramm', iconUrl: require('@/assets/icons/instagramm.svg') },
                    ],
                },
            ],
        }
    },
}
