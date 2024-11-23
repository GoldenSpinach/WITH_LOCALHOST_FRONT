<template>
  <GoogleMap :api-key="VITE_GOOGLE_MAP_KEY" style="width: 100%; height: 100%" :center="center" :zoom="15">
    <Marker :options="{ position: { lat: pos.lat, lng: pos.lng } }" v-for="(pos, index) in positions" :key="index" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map';
import { ref } from 'vue';

const { VITE_GOOGLE_MAP_KEY } = import.meta.env;

const props = defineProps({
  positions: {
    type: Array,
    default: () => []
  },
  center: {
    type: Object,
    default: () => ({ lat: 37.5665, lng: 126.9780 }) // 기본 위치 설정 (서울)
  }
});
</script>

<style scoped>
/* 추가적인 스타일 정의 가능 */
</style>
