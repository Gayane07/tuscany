<template>
    <nav>
        <div class="container">
            <div class="flex-between-center">
                <div class="logo cursor-pointer">
                    <img
                        src="@/assets/icons/logo.svg"
                        :alt="$t('logo')"
                        width="133"
                        height="130"
                        @click="$router.push('/')"
                    />
                </div>

                <div class="flex-between-center nav-links">
                    <div class="flex-between-center nav-links__links">
                        <div class="pages-item" v-for="(link, index) in pages" :key="index">
                            <router-link
                                :class="{ 'active-nested-route': link.active }"
                                :to="{ name: link.url }"
                            >
                                {{ link.name }}
                            </router-link>
                        </div>
                    </div>
                    <div class="flex-between-center nav-links__buttons">
                        <v-select
                            class="nav-links__buttons--select"
                            :options="languages"
                            :value="localLanguage"
                            :clearable="false"
                            :filterable="false"
                            :searchable="false"
                            @input="onChange"
                        ></v-select>
                        <button class="nav-links__buttons--login" @click="authModalType = 'login'">
                            {{ $t('login') }}
                        </button>
                        <PrimaryButton :label="$t('signUp')" @onClick="authModalType = 'register'" />
                    </div>
                </div>
            </div>
        </div>
        <div class="divider"></div>

        <Auth :type="authModalType" @close="authModalType = ''" />
    </nav>
</template>

<script>
import 'vue-select/dist/vue-select.css'

// Components
import vSelect from 'vue-select'
import PrimaryButton from '@/components/PrimaryButton'
import Auth from '@/views/authentication/Auth'

export default {
    name: 'HeaderComponent',
    components: { vSelect, PrimaryButton, Auth },
    data() {
        return {
            localLanguage: 'Eng',
            authModalType: '',
            pages: [
                { name: this.$t('home'), url: 'home', path: 'home', active: false },
                { name: this.$t('aboutUs'), url: 'aboutUs', path: 'about-us', active: false },
                { name: this.$t('tourPackages'), url: 'tourPackages', path: 'tour-packages', active: false },
                { name: this.$t('contactUs'), url: 'contactUs', path: 'contact-us', active: false },
            ],
            languages: [{ title: 'Eng', label: 'Eng' }],
        }
    },
    methods: {
        onChange(item) {
            this.localLanguage = item.label
        },
        resetActiveNestedTab() {
            this.pages.forEach(item => (item.active = false))
        },
    },
    watch: {
        $route(to) {
            if (!to.path.includes('tour-packages')) {
                this.resetActiveNestedTab()
            }
            const tabname = to.path.split('/')[1]
            if (tabname === 'tour-packages') {
                this.pages.find(item => item.path === tabname).active = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.router-link-exact-active,
.active-nested-route {
    border-bottom: 3px solid #fa8b02;
}

nav {
    position: fixed;
    z-index: 99;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    padding: 20px 0 0 0;
    background: rgba(255, 255, 255, 0.8);
    .nav-links {
        gap: 167px;
        &__links {
            gap: 40px;
        }
        &__buttons {
            gap: 26px;
            &--select {
                width: 70px;
                ::v-deep {
                    .vs__dropdown-toggle {
                        cursor: pointer;
                        border: none;
                        background: transparent;
                    }
                    input {
                        display: none;
                    }
                    &.vs--open {
                        input {
                            display: block;
                        }
                    }
                    span.vs__selected {
                        color: #33333380;
                    }
                    .vs__dropdown-menu {
                        margin-top: 10px;
                    }
                }
            }
            &--login {
                background: transparent;
            }
        }
    }
}

@media only screen and (max-width: 1599px) {
    nav {
        font-size: 18px;
        .nav-links {
            gap: 140px;
            &__links {
                gap: 30px;
            }
            &__buttons {
                gap: 20px;
            }
        }
    }
    .logo {
        img {
            width: 120px;
            height: 117px;
        }
    }
}

@media only screen and (max-width: 1359px) {
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
}
</style>
