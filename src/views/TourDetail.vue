<template>
  <div class="w-full border-t"></div>
  <div class="w-full flex flex-col items-center h-screen mt-[50px]" v-if="detail">
    <img class="w-[30px] self-start mb-[25px] ms-[2%] cursor-pointer" src="@/assets/images/back.svg" alt="" />
    <div class="w-full flex items-center justify-around mb-[20px]">
      <div class="w-[48%]">
        <div class="border-b mb-[15px] pb-[15px]">
          <h1 class="text-4xl font-bold">{{ detail.title }}</h1>
          <div class="flex box-border pt-[10px] items-center gap-[5px]">
            <img src="@/assets/images/star.svg" alt="별점" />
            <span class="inline-block flex items-center">{{ detail.reviewAvg }}</span>
          </div>
        </div>
        <div class="flex w-full justify-between">
          <div class="w-[45%]">
            <h2 class="text-3xl font-bold">일정</h2>
            <div class="my-[25px] border-b"></div>
            <div class="flex flex-col gap-[8px] max-h-[700px] overflow-y-auto">
              <div
                class="w-full border rounded-lg h-[50px] min-h-[50px] shadow-lg box-border ps-[15px] flex items-center text-ellipsis overflow-hidden cursor-pointer"
                v-for="activity in detail.activities" :key="activity.actId" @click="selectActivity(activity)">
                {{ activity.actName }}
              </div>
            </div>
          </div>
          <div class="w-[45%] flex flex-col">
            <h2 class="text-3xl font-bold">체험 사진</h2>
            <div class="my-[25px] border-b"></div>
            <div class="w-full grid h-[650px]">
              <div v-for="image in detail.activities" :key="image.actId">
                <img :src="image.actImgUrl" alt="사진" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/5 h-[700px] mt-[64px]">
        <Map :positions="positions" :center="mapCenter" />
      </div>
    </div>
    <div class="w-full flex items-center justify-around">
      <div class="flex w-[48%]">
        <div class="w-full flex flex-col gap-[20px]">
          <div class="w-full">
            <h2 class="text-3xl font-bold">소개</h2>
            <div class="my-[25px] border-b"></div>
            <article class="w-full rounded-lg box-border px-[15px] py-[25px]">
              {{ detail.content }}
            </article>
          </div>
          <div class="w-full flex flex-wrap gap-[6px]">
            <div v-for="option in detail.options" :key="option.id"
              class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full text-center whitespace-nowrap overflow-hidden text-ellipsis">
              {{ option.optionName }}
            </div>
          </div>
          <div>
            <h2 class="text-3xl font-bold">리뷰</h2>
            <div class="my-[25px] border-b"></div>
            <div class="flex flex-col gap-[8px] max-h-[700px] overflow-y-auto">
              <div
                class="w-full rounded-lg h-[50px] min-h-[50px] shadow-lg box-border ps-[15px] flex items-center text-ellipsis overflow-hidden"
                v-for="(review, index) in detail.reviews" :key="review.index">
                {{ review.reviewContent }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center w-[40%]">
        <div>
          <Datepicker v-model="selectedDate" :inline="true" :allowed-dates="allowedDates"
            style="--dp-cell-padding: 35px" />
        </div>
        <div class="w-full justify-around flex mt-[25px]">
          <button class="w-[35%] h-[45px] bg-blue-400 text-white rounded-lg">
            예약하기
          </button>
          <button class="w-[35%] h-[45px] bg-blue-400 text-white rounded-lg">
            문의하기
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex items-center justify-around">
      <div class="flex w-[48%]">
        <div class="w-full">
          <h2 class="text-3xl font-bold">호스트 소개</h2>
          <div class="my-[25px] border-b"></div>
          <article class="rounded-lg box-border px-[15px] py-[25px]">
            {{ detail.content }}테스트 소개
          </article>
        </div>
      </div>
      <div class="flex w-[40%]">
        <div class="w-full">
          <h2 class="text-3xl font-bold">유의사항</h2>
          <div class="my-[25px] border-b"></div>
          <article class="rounded-lg box-border px-[15px] py-[25px]">
            {{ detail.content }}유의사항 데스요
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Map from "@/components/map/Map.vue";
import { getTourDetail } from "@/api/tour";
import { useRoute } from "vue-router";

const detail = ref(null);
const positions = ref([]);
const mapCenter = ref(null); // 지도의 중심을 지정하는 ref
const selectedDate = ref(null);
const route = useRoute();

// 특정 날짜만 활성화하려면 배열에 해당 날짜들을 추가합니다.
const allowedDates = ref([
  new Date(2024, 10, 20), // 2024년 11월 20일
  new Date(2024, 10, 25),
  new Date(2024, 11, 5),
]);

onMounted(async () => {
  const id = route.params.tourId;
  detail.value = await getTourDetail(id);
  positions.value = detail.value.activities.map((activity) => ({
    lat: activity.actLatitude,
    lng: activity.actLongitude,
  }));
  // 초기 맵 중심 설정
  if (positions.value.length > 0) {
    mapCenter.value = positions.value[0];
  }
});

// 특정 일정을 선택했을 때 해당 위치로 지도 중심 이동
const selectActivity = (activity) => {
  mapCenter.value = { lat: activity.actLatitude, lng: activity.actLongitude };
};
</script>


<style></style>
