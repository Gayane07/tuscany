<template>
    <button
        class="primary flex-center-center"
        :class="{ 'search-button': showSearchIcon }"
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

    .spinner {
        animation: spin 1.5s infinite ease-in-out;
        border-radius: 50%;
        border-top: 2px solid #fff;
        display: inline-block;
        height: 20px;
        width: 20px;
        color: black;
    }
}

@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
