<template>
  <GoogleMap :api-key="VITE_GOOGLE_MAP_KEY" style="width: 100%; height: 100%" :center="positions[0]" :zoom="15">
    <Marker :options="{ position: { lat: pos.lat, lng: pos.lng } }" v-for="pos in props.positions" />
  </GoogleMap>
</template>
<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
const { VITE_GOOGLE_MAP_KEY } = import.meta.env
const props = defineProps({
  positions: Array
})
</script>
