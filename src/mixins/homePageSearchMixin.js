import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            isDatepickerOpened: false,
            locale: this.localStorage?.getItem('locale') || 'en',
            timeOptions: [
                { value: '1:00am', label: '1:00 am' },
                { value: '2:00am', label: '2:00 am' },
                { value: '3:00am', label: '3:00 am' },
                { value: '4:00am', label: '4:00 am' },
                { value: '5:00am', label: '5:00 am' },
                { value: '6:00am', label: '6:00 am' },
                { value: '7:00am', label: '7:00 am' },
                { value: '8:00am', label: '8:00 am' },
                { value: '9:00am', label: '9:00 am' },
                { value: '10:00am', label: '10:00 am' },
                { value: '11:00am', label: '11:00 am' },
                { value: '12:00am', label: '12:00 am' },

                { value: '1:00pm', label: '1:00 pm' },
                { value: '2:00pm', label: '2:00 pm' },
                { value: '3:00pm', label: '3:00 pm' },
                { value: '4:00pm', label: '4:00 pm' },
                { value: '5:00pm', label: '5:00 pm' },
                { value: '6:00pm', label: '6:00 pm' },
                { value: '7:00pm', label: '7:00 pm' },
                { value: '8:00pm', label: '8:00 pm' },
                { value: '9:00pm', label: '9:00 pm' },
                { value: '10:00pm', label: '10:00 pm' },
                { value: '11:00pm', label: '11:00 pm' },
                { value: '12:00pm', label: '12:00 pm' },
            ],
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
