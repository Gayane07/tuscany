<template>
    <button
        class="primary flex-center-center"
        :class="{ 'search-button': showSearchIcon, 'danger-button': danger, 'secondary-button': secondary }"
        :disabled="disabled"
        @click="$emit('onClick')"
    >
        <span class="spinner" v-if="loading"></span>
        <div v-else>
            <span>{{ label }}</span>
            <img v-if="showSearchIcon" src="@/assets/icons/search.svg" :alt="$t('searchIcon')" />
        </div>
    </button>
</template>

<script>
export default {
    name: 'PrimaryButton',
    props: {
        label: {
            type: String,
            required: true,
            default: 'Some text',
        },
        showSearchIcon: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        danger: {
            type: Boolean,
            default: false,
        },
        secondary: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
.primary {
    position: relative;
    background-color: #fa8b02;
    color: #fff;
    padding: 10px 24px;
    border-radius: 50px;
    transition: 0.2s;
    &:hover {
        background-color: #d77a08;
        transition: 0.2s;
    }
    &:disabled {
        background-color: #33333399;
        cursor: default;
    }

    &.search-button {
        border-radius: 12px;
        width: 80px;
        height: 80px;
    }

    &.danger-button {
        background-color: #fa2f02;
        &:hover {
            background-color: #d3300b;
        }
    }

    &.secondary-button {
        background-color: #fff;
        border: 1px solid #fa8b02;
        color: #fa8b02;
        &:hover {
            background-color: #fa8b02;
            color: #fff;
        }
    }
}

@media only screen and (max-width: 991px) {
    button {
        font-size: 16px !important;
        img {
            width: 22px;
            height: 22px;
        }
    }
}
</style>
