export const sliderOptions = {
    rewind: true,
    type: 'loop',
    perPage: 4,
    perMove: 1,
    pagination: false,
    gap: '33px',
    cover: true,
    lazyLoad: 'nearby',
    autoplay: false,
    interval: 4000,
    speed: 1000,
    breakpoints: {
        1359: {
            perPage: 4,
        },
        1199: {},
        991: {},
        767: {},
        575: {
            perPage: 2,
        },
        420: {
            perPage: 1
        }
    },
}