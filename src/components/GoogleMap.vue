<template>
    <gmap-map class="map" :zoom="11" :center="center" style="width: 100%" :options="options" ref="googleMap">
        <gmap-marker
            :key="index"
            v-for="(m, index) in locationMarkers"
            :position="m.position"
            :icon="markerIcon"
            @click="center = m.position"
        ></gmap-marker>
    </gmap-map>
</template>

<script>
import markerIcon from '@/assets/icons/logo-as-marker.png'

export default {
    name: 'AddGoogleMap',
    data() {
        return {
            markerIcon,
            center: {
                lat: 43.7711,
                lng: 11.2486,
            },
            locationMarkers: [
                {
                    position: { lat: 43.7711, lng: 11.2486 },
                },
            ],
            options: {
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: true,
                fullscreenControl: false,
            },
        }
    },
}
</script>

<style lang="scss" scoped>
.map {
    height: 600px;
}

@media only screen and (max-width: 1559px) {
    .map {
        height: 500px;
    }
}
@media only screen and (max-width: 1359px) {
    .map {
        height: 400px;
    }
}
@media only screen and (max-width: 1199px) {
}
@media only screen and (max-width: 991px) {
    .map {
        height: 350px;
    }
}
@media only screen and (max-width: 767px) {
}
@media only screen and (max-width: 575px) {
    .map {
        height: 300px;
    }
}
@media only screen and (max-width: 475px) {
}
</style>
