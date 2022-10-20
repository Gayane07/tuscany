<template>
    <div :style="{ paddingTop: headerHeight + 'px' }">tour packages</div>
</template>

<script>
export default {
    name: 'TourPackages',
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped></style>
