<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_KEY"
    :styles="mapStyle"
    style="width: 100%; height: 100%"
    :center="center"
    :zoom="15"
  >
    <Marker
      :options="{ position: { lat: pos.lat, lng: pos.lng } }"
      v-for="(pos, index) in positions"
      :key="index"
    />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import { ref } from "vue";

const { VITE_GOOGLE_MAP_KEY } = import.meta.env;

const props = defineProps({
  positions: {
    type: Array,
    default: () => [],
  },
  center: {
    type: Object,
    default: () => ({ lat: 37.5665, lng: 126.978 }), // 기본 위치 설정 (서울)
  },
});

const mapStyle = ref([
  {
    featureType: "water",
    stylers: [
      {
        saturation: 43,
      },
      {
        lightness: -11,
      },
      {
        hue: "#0088ff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        hue: "#ff0000",
      },
      {
        saturation: -100,
      },
      {
        lightness: 99,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#808080",
      },
      {
        lightness: 54,
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ece2d9",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ccdca1",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#767676",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#b8cb93",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
]);
</script>

<style scoped>
/* 추가적인 스타일 정의 가능 */
</style>
