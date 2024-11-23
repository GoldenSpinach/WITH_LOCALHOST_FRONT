<template>
  <div class="flex w-full">
    <div class="w-1/2">
      <span class="text-xl text-slate-400">
        {{ new Date(reservation.startDate).toISOString().split("T")[0] }}
      </span>
      <div class="w-full border h-[200px] rounded-lg flex">
        <img
          class="h-full w-1/3"
          src="@/assets/images/default.png"
          alt="패키지사진"
        />
        <div class="w-2/3 flex flex-col">
          <h3 class="w-full block box-border p-[5px] text-lg truncate">
            {{ reservation.title }}
          </h3>
          <div class="flex gap-[5px] items-center h-[24px] mt-[5px]">
            <img
              src="@/assets/images/default_profile_small.svg"
              alt="프로필사진"
            />
            <span>{{ reservation.guidName }}</span>
          </div>
          <button
            v-if="reservation.reservationStatus === 'A'"
            class="border w-1/2 cursor-pointer self-end bg-blue-400 text-white rounded-lg self-end mt-[95px] me-[10px]"
          >
            예약완료
          </button>
          <button
            v-else-if="reservation.reservationStatus === 'P'"
            class="border w-1/2 cursor-pointer self-end bg-slate-400 text-white rounded-lg self-end mt-[95px] me-[10px]"
          >
            예약대기
          </button>
          <button
            v-else
            class="border w-1/2 cursor-pointer self-end bg-red-400 text-white rounded-lg self-end mt-[95px] me-[10px]"
          >
            예약취소
          </button>
        </div>
      </div>
    </div>
    <div class="w-1/2 pt-[30px] ps-[15px]">
      <span class="text-lg">내 리뷰</span>
      <div class="w-full border h-[170px] round">
        <template v-if="reviewInfo">
          <div
            class="w-full h-[170px] box-border px-[15px] py-[5px] flex flex-col"
          >
            <div
              v-if="!isUpdateMode"
              class="w-full h-full max-w-[800px] truncate mt-[5px] px-[15px] py-[10px]"
            >
              {{ reviewInfo.reviewContent }}
            </div>
            <textarea
              v-else
              v-model="reviewInfo.reviewContent"
              class="w-4/5 border h-full rounded-md px-[15px] py-[10px] resize-none"
            />
            <div class="self-end flex h-[30px]">
              <template v-if="!isUpdateMode">
                <div class="flex items-center justify-start w-full">
                  <img class="w-[24px]" src="@/assets/images/star.svg" alt="" />
                  <span class="mt-[2px] text-center">{{
                    reviewInfo.reviewScore.toFixed(1)
                  }}</span>
                </div>
                <img
                  class="w-[30px] cursor-pointer"
                  src="@/assets/images/pen.svg"
                  alt=""
                  @click="changeMode()"
                />
                <img
                  class="w-[30px] cursor-pointer"
                  src="@/assets/images/trashcan.svg"
                  alt=""
                  @click="clickDelete(reservation.myReview.reservationId)"
                />
              </template>
              <template v-else>
                <div class="flex items-center justify-start w-full gap-[5px]">
                  <button
                    class="px-[15px]"
                    @click="clickUpdate(reservation.myReview.reservationId)"
                  >
                    완료
                  </button>
                  <button class="px-[15px]" @click="changeMode()">취소</button>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else
          ><div
            class="text-xl h-full text-slate-400 flex items-center justify-center"
          >
            <span>아직 리뷰를 작성하지 않았어요</span>
          </div></template
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { deleteReview, updateReview } from "@/api/member";
const props = defineProps({
  reservation: Object,
});

const reviews = ref([]);
const isUpdateMode = ref(false);
const reviewInfo = ref(null);

watch(
  () => props.reservation,
  (newReservation) => {
    if (newReservation && newReservation.myReview) {
      reviewInfo.value = {
        reservationId: newReservation.myReview.reservationId,
        reviewContent: newReservation.myReview.reviewContent,
        reviewScore: newReservation.myReview.reviewScore,
      };
    } else {
      reviewInfo.value = null;
    }
  },
  { immediate: true }
);

const clickDelete = async () => {
  const res = await deleteReview(props.reservation.reservationId);
};
const clickUpdate = async () => {
  console.log("수정", reviewInfo.value);
  const res = await updateReview({
    reservator: "minji123",
    ...reviewInfo.value,
  });
  changeMode();
};
const changeMode = () => {
  isUpdateMode.value = !isUpdateMode.value;
};
</script>
<style></style>
