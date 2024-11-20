<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
<script>
import { GoogleMap, Marker } from "vue3-google-map";
const { VITE_MAP_API } = import.meta.env;
</script>
<style></style>
