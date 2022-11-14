import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/HomePage.vue'),
    },
    {
        path: '/about-us',
        name: 'aboutUs',
        component: () => import('../views/aboutUs/AboutUs.vue'),
    },
    {
        path: '/tour-packages',
        name: 'tourPackages',
        component: () => import('../views/tourPackages/TourPackages.vue'),
    },
    {
        path: '/tour-packages/:id',
        name: 'tourPackage',
        component: () => import('../views/tourPackages/tourPackage/TourPackage.vue'),
    },
    {
        path: '/tour-packages/:id/book',
        name: 'bookingDetails',
        component: () => import('../views/tourPackages/buy/BuyPage.vue'),
    },
    {
        path: '/contact-us',
        name: 'contactUs',
        component: () => import('../views/contactUs/ContactUs.vue'),
    },
    {
        path: '/result',
        name: 'searchResult',
        component: () => import('../views/searchResult/Result.vue'),
    },
    {
        path: '/my-tickets',
        name: 'myTickets',
        component: () => import ('../views/myTickets/MyTickets.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
