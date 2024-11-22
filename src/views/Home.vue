<template>
  <section class="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
    <div class="flex flex-col gap-48 justify-center items-center">
      <div class="flex items-center gap-24 relative">
        <div class="text-7xl flex flex-col gap-[15px] font-bold">
          <span class="inline-block">현지인이</span>
          <span class="inline-block">호스팅하는</span>
          <span class="inline-block">잊지못할 여행</span>
        </div>
        <!-- 캐러셀 그라데이션 효과 적용 -->
        <div class="relative w-[700px] overflow-hidden">
          <Carousel itemsToShow="3" wrapAround="true" :autoplay="2000" :paginationEnabled="true" transition="600"
            class="relative z-0">
            <Slide v-for="tour in tours" :key="tour.tourId">
              <RouterLink :to="`/guide/${tour.id}`"
                class="opacity-50 text-white hover:opacity-100 hover:text-slate-400 text-sm">
                <img :src="tour.mainImgUrl" :alt="tour.title" class="w-full h-auto rounded-sm" />
                <div class="flex justify-start ps-[15px]">
                  <span>{{ tour.title }}</span>
                </div>
              </RouterLink>
            </Slide>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import { getCurrentTours } from "@/api/tour";
import { RouterLink } from "vue-router";

const tours = ref([]);

onMounted(async () => {
  tours.value = await getCurrentTours();
})
</script>

<style></style>
