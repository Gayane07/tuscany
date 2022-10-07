export default {
    methods: {
        handleChangeValue(field, value) {
            this.payload[field] = value
            this.$v.payload[field].$touch()
        },
    },
}
