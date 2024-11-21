<template>
  <GoogleMap :api-key="VITE_GOOGLE_MAP_KEY" style="width: 100%; height: 100%" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
const { VITE_GOOGLE_MAP_KEY } = import.meta.env
const center = { lat: 40.689247, lng: -74.044502 }
</script>
