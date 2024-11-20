<template>

    <section class="flex flex-col items-center justify-center">
        <div class="flex flex-col gap-48 justify-center items-center">
            <form
                class="flex  w-3/4 px-[50px] max-w-[11670px] h-[70px] items-center gap-4 p-4 rounded-full shadow-lg border border-gray-200 relative">
                <div class="flex">
                    <div class="flex flex-col mt-[3px]">
                        <label for="local" class="text-xs text-zinc-400 mb-[5px]">지역</label>
                        <input type="text" id="local" placeholder="지역 검색"
                            class="pe-4 pb-2 w-32 rounded-md  focus:outline-none focus:border-blue-500" />
                    </div>
                    <div class="flex flex-col mt-[3px]">
                        <label for="local" class="text-xs text-zinc-400 mb-[5px]">출발</label>
                        <input type="date" class="pe-4 pb-2 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div class="flex flex-col mt-[3px]">
                        <label for="local" class="text-xs text-zinc-400 mb-[5px]">종료</label>
                        <input type="date" class="pe-4 pb-2 rounded-md  focus:outline-none focus:border-blue-500" />
                    </div>
                    <div class="flex flex-col mt-[3px] ">
                        <label for="local" class="text-xs text-zinc-400 mb-[3px]">추가 옵션</label>
                        <div class="flex gap-[6px]">
                            <span class="bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer">차량</span>
                            <span class="bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer">일본어</span>
                            <span class="bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer">영어</span>
                        </div>
                    </div>
                </div>
                <button type="submit" class="ml-4 absolute end-[40px]">
                    <img src="@/assets/images/search.svg" alt="검색" class="w-6 h-6" />
                </button>
            </form>
            <div class="flex items-center gap-24 relative">
                <div class="text-7xl flex flex-col gap-[15px] font-bold">
                    <span class="inline-block">현지인이</span>
                    <span class="inline-block">호스팅하는</span>
                    <span class="inline-block">잊지못할 여행</span>
                </div>
                <!-- 캐러셀 그라데이션 효과 적용 -->
                <div class="relative w-[700px] overflow-hidden">
                    <Carousel itemsToShow="3" wrapAround="true" :autoplay="2000" :paginationEnabled="true"
                        transition="600" class="relative z-0">
                        <Slide v-for="tour in tours" :key="tour.tourId">
                            <div class="opacity-50 text-white hover:opacity-100 hover:text-slate-400 text-sm">
                                <img :src="defaultImage" :alt="tour.title" class="w-full h-auto rounded-sm">
                                <div class="flex justify-start ps-[15px]">
                                    <span>{{ tour.title }}</span>
                                </div>
                            </div>
                        </Slide>
                    </Carousel>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import defaultImage from '@/assets/images/default.png';
import "vue3-carousel/dist/carousel.css";

const tours = ref([])
</script>

<style></style>