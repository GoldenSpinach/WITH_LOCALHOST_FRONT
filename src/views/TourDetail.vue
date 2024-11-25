<template>
  <div class="w-full border-t"></div>
  <div
    class="w-full flex flex-col items-center h-screen mt-[50px]"
    v-if="detail"
  >
    <img
      class="w-[30px] self-start mb-[25px] ms-[2%] cursor-pointer"
      src="@/assets/images/back.svg"
      alt="Back"
    />
    <div class="w-full flex items-center justify-around mb-[20px]">
      <div class="w-[48%]">
        <div class="border-b mb-[15px] pb-[15px]">
          <h1 class="text-4xl font-bold">{{ detail.title }}</h1>
          <div class="flex box-border pt-[10px] items-center gap-[5px]">
            <img src="@/assets/images/star.svg" alt="Star" />
            <span class="inline-block flex items-center">{{
              detail.reviewAvg
            }}</span>
          </div>
        </div>
        <div class="flex w-full justify-between">
          <div class="w-[45%]">
            <h2 class="text-3xl font-bold">{{ t("일정") }}</h2>
            <div class="my-[25px] border-b"></div>
            <div class="flex flex-col gap-[8px] max-h-[700px] overflow-y-auto">
              <div
                class="w-full border rounded-lg h-[50px] min-h-[50px] shadow-lg box-border ps-[15px] flex items-center text-ellipsis overflow-hidden cursor-pointer"
                v-for="activity in detail.activities"
                :key="activity.actId"
                @click="selectActivity(activity)"
              >
                {{ activity.actName }}
              </div>
            </div>
          </div>
          <div class="w-[45%] flex flex-col">
            <h2 class="text-3xl font-bold">{{ t("체험 사진") }}</h2>
            <div class="my-[25px] border-b"></div>
            <div class="w-full grid h-[650px]">
              <div v-for="image in detail.activities" :key="image.actId">
                <img :src="image.actImgUrl" alt="Photo" />
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
          <div class="w-full min-h-[300px]">
            <h2 class="text-3xl font-bold">{{ t("소개") }}</h2>
            <div class="my-[25px] border-b"></div>
            <article class="w-full rounded-lg box-border px-[15px] py-[25px]">
              {{ detail.content }}
            </article>
          </div>
          <div class="w-full flex flex-wrap gap-[6px] min-h-[200px]">
            <div
              v-for="option in detail.options"
              :key="option.id"
              class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full text-center whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ option.optionName }}
            </div>
          </div>
          <div>
            <h2 class="text-3xl font-bold">{{ t("리뷰") }}</h2>
            <div class="my-[25px] border-b"></div>
            <div class="flex flex-col gap-[8px] max-h-[400px] overflow-y-auto">
              <div
                class="w-full rounded-lg h-[50px] min-h-[50px] shadow-lg box-border ps-[15px] flex items-center text-ellipsis overflow-hidden"
                v-for="(review, index) in detail.reviews"
                :key="index"
              >
                {{ review.reviewContent }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center w-[40%]">
        <div>
          <Datepicker
            v-model="selectedDate"
            :inline="true"
            :disabled-dates="disabledDates"
            :range="{ autoRange: detail.needDate - 1 }"
            auto-apply
            style="--dp-cell-padding: 35px"
          />
        </div>
        <div class="w-full justify-around flex mt-[25px]">
          <button
            class="w-[35%] h-[45px] bg-blue-400 text-white rounded-lg"
            @click="sendReservation"
          >
            {{ t("예약하기") }}
          </button>
          <button
            @click="sendChat"
            class="w-[35%] h-[45px] bg-blue-400 text-white rounded-lg"
          >
            {{ t("문의하기") }}
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex items-center justify-around mt-[50px]">
      <div class="flex w-[48%]">
        <div class="w-full min-h-[400px]">
          <h2 class="text-3xl font-bold">{{ t("호스트 소개") }}</h2>
          <div class="my-[25px] border-b"></div>
          <article class="rounded-lg box-border px-[15px] py-[25px]">
            {{ detail.content }}
          </article>
        </div>
      </div>
      <div class="flex w-[40%]">
        <div class="w-full min-h-[400px]">
          <h2 class="text-3xl font-bold">{{ t("유의사항") }}</h2>
          <div class="my-[25px] border-b"></div>
          <article class="rounded-lg box-border px-[15px] py-[25px]">
            {{ detail.content }}
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Map from "@/components/map/Map.vue";
import { getTourDetail } from "@/api/tour";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMemberStore } from "../stores/member";
import { useChatStore } from "../stores/chatStore";
import { openChatRoom } from "../api/chat";
import { makeReservation } from "../api/reservation";
import { translateWithChatGPT } from "@/api/translate"; // 번역 함수
import { toast } from "vue3-toastify";

const { t } = useI18n(); // 다국어 번역 함수
const detail = ref(null);
const positions = ref([]);
const mapCenter = ref(null); // 지도의 중심을 지정하는 ref
const selectedDate = ref(null);
const route = useRoute();
const chatStore = useChatStore();
const disabledDates = ref([]);
const memberStore = useMemberStore();

onMounted(async () => {
  const id = route.params.tourId;
  detail.value = await getTourDetail(id);

  // 번역 작업
  if (detail.value) {
    detail.value.title = await translateWithChatGPT(detail.value.title);
    detail.value.content = await translateWithChatGPT(detail.value.content);

    // 활동 목록 번역
    for (const activity of detail.value.activities) {
      activity.actName = await translateWithChatGPT(activity.actName);
    }

    // 옵션 번역
    for (const option of detail.value.options) {
      option.optionName = await translateWithChatGPT(option.optionName);
    }

    // 리뷰 번역
    for (const review of detail.value.reviews) {
      review.reviewContent = await translateWithChatGPT(review.reviewContent);
    }
  }

  // 활동 위치 좌표 설정
  positions.value = detail.value.activities.map((activity) => ({
    lat: activity.actLatitude,
    lng: activity.actLongitude,
  }));

  // 초기 맵 중심 설정
  if (positions.value.length > 0) {
    mapCenter.value = positions.value[0];
  }

  // 예약된 기간을 disabledDates에 추가
  if (detail.value.reservations) {
    detail.value.reservations.forEach((reservation) => {
      const startDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);

      const adjustedStartDate = new Date(startDate); // 시작일 복사
      adjustedStartDate.setDate(
        startDate.getDate() - detail.value.needDate - 1
      ); // 시작일에서 needDate 만큼 뺀 날짜 계산

      // adjustedStartDate부터 endDate까지의 날짜를 disabledDates에 추가
      for (
        let currentDate = new Date(adjustedStartDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        console.log(currentDate);
        disabledDates.value.push(new Date(currentDate));
      }
    });
  }
});

// 특정 일정을 선택했을 때 해당 위치로 지도 중심 이동
const selectActivity = (activity) => {
  mapCenter.value = { lat: activity.actLatitude, lng: activity.actLongitude };
};

const sendChat = async () => {
  const guest = memberStore.memberId;
  const guide = detail.value.guidName;
  await openChatRoom(guide, guest);
  chatStore.toggleChat();
};

const sendReservation = async () => {
  const info = {
    tourId: detail.value.tourId,
    reservater: memberStore.memberId,
    startDate: selectedDate.value[0],
    endDate: selectedDate.value[selectedDate.value.length - 1],
    reservationPeople: 1,
    reservationPay: detail.value.pay,
  };
  console.log(info);
  console.log(selectedDate.value);
  const data = await makeReservation(info);
  console.log(data);
  toast("예약신청완료!");
};
</script>

<style></style>
