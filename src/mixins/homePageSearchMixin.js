import { mapActions, mapGetters } from 'vuex'
import { times } from '@/utils/timeOptions.js'

export default {
    data() {
        return {
            isDatepickerOpened: false,
            locale: this.localStorage?.getItem('locale') || 'en',
            timeOptions: times,
            tourOptions: [
                { value: 'luccaBikeTour', label: this.$t('luccaBikeTour') },
                { value: 'bookABike', label: this.$t('bookABike') },
                { value: 'tourOutsideLucca', label: this.$t('tourOutsideLucca') },
                { value: 'wineTestingInTuscany', label: this.$t('wineTestingInTuscany') },
                { value: 'cinqueTerreTour', label: this.$t('cinqueTerreTour') },
                { value: 'sienaAndSurroundings', label: this.$t('sienaAndSurroundings') },
                { value: 'pissaLucca', label: this.$t('pissaLucca') },
                { value: 'italySpecialTrips', label: this.$t('italySpecialTrips') },
            ],
        }
    },

    methods: {
        ...mapActions('homePageModule', ['handleSearch']),
        onChange(item, field) {
            this.payload[field] = item.value
            this.selectedLabels[field] = item.label
        },
        setDatepickerMenuStyles() {
            this.$nextTick(() => {
                document.querySelectorAll('.vd-picker__controls-wrapper button').forEach(button => {
                    button.style.fontSize = '18px'
                    button.style.fontWeight = '600'
                })
            })
        },

        onSearch() {
            this.handleSearch(this.payload)
        },
    },
    computed: {
        ...mapGetters('homePageModule', ['searchLoading']),
    },
}
