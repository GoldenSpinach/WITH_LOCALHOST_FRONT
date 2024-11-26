<template>
  <div class="flex w-full">
    <div class="w-1/2">
      <span class="text-xl text-slate-400">
        {{ new Date(reservation.startDate).toISOString().split("T")[0] }}
      </span>
      <div class="w-full border h-[200px] rounded-lg flex">
        <img class="h-full w-1/3" src="@/assets/images/default.png" alt="패키지사진" />
        <div class="w-2/3 flex flex-col">
          <h3 class="w-full block box-border p-[5px] text-lg truncate">
            {{ reservation.title }}
          </h3>
          <div class="flex gap-[5px] items-center h-[24px] mt-[5px]">
            <img src="@/assets/images/default_profile_small.svg" alt="프로필사진" />
            <span>{{ reservation.guidName }}</span>
          </div>
          <button v-if="reservation.reservationStatus === 'A'"
            class="border w-1/2 cursor-pointer self-end bg-blue-400 text-white rounded-lg self-end mt-[95px] me-[10px]">
            {{ t("예약완료") }}
          </button>
          <button v-else-if="reservation.reservationStatus === 'P'"
            class="border w-1/2 cursor-pointer self-end bg-slate-400 text-white rounded-lg self-end mt-[95px] me-[10px]">
            {{ t("예약대기") }}
          </button>
          <button v-else
            class="border w-1/2 cursor-pointer self-end bg-red-400 text-white rounded-lg self-end mt-[95px] me-[10px]">
            {{ t("예약취소") }}
          </button>
        </div>
      </div>
    </div>
    <div class="w-1/2 pt-[30px] ps-[15px]">
      <span class="text-lg">{{ t("내 리뷰") }}</span>
      <div class="w-full border h-[170px] rounded-md">
        <template v-if="reviewInfo">
          <div class="w-full h-[170px] box-border px-[15px] py-[5px] flex flex-col">
            <div v-if="!isUpdateMode" class="w-full h-full max-w-[800px] truncate mt-[5px] px-[15px] py-[10px]">
              {{ reviewInfo.reviewContent }}
            </div>
            <textarea v-else v-model="reviewInfo.reviewContent"
              class="w-4/5 border h-full rounded-md px-[15px] py-[10px] resize-none" />
            <div class="self-end flex h-[30px]">
              <template v-if="!isUpdateMode">
                <div class="flex items-center justify-start w-full">
                  <img class="w-[24px]" src="@/assets/images/star.svg" alt="" />
                  <span class="mt-[2px] text-center">{{
                    reviewInfo.reviewScore.toFixed(1)
                  }}</span>
                </div>
                <img class="w-[30px] cursor-pointer" src="@/assets/images/pen.svg" alt="" @click="changeMode()" />
                <img class="w-[30px] cursor-pointer" src="@/assets/images/trashcan.svg" alt="" @click="clickDelete()" />
              </template>
              <template v-else>
                <div class="flex items-center justify-start w-full gap-[5px]">
                  <button class="px-[15px]" @click="clickUpdate()">
                    {{ t("완료") }}
                  </button>
                  <button class="px-[15px]" @click="changeMode()">
                    {{ t("취소") }}
                  </button>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-if="!isNewReviewMode" class="text-xl h-full text-slate-400 flex items-center justify-center">
            <span>{{ t("아직 리뷰를 작성하지 않았어요") }}</span>
            <button @click="startNewReview()" class="ml-[10px] px-[15px] py-[5px] bg-blue-400 text-white rounded-md">
              {{ t("리뷰 작성") }}
            </button>
          </div>
          <div v-if="isNewReviewMode" class="flex flex-col gap-[10px] mt-[15px]">
            <textarea v-model="newReviewContent"
              class="w-full border h-[100px] rounded-md px-[15px] py-[10px] resize-none"
              placeholder="{{ t('리뷰 내용') }}"></textarea>
            <div class="flex items-center justify-start w-full gap-[5px]">
              <button class="px-[15px] bg-blue-400 text-white rounded-md" @click="submitNewReview()">
                {{ t("리뷰 제출") }}
              </button>
              <button class="px-[15px]" @click="cancelNewReview()">
                {{ t("취소") }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { deleteReview, updateReview } from "@/api/member";
import { translateWithChatGPT } from "@/api/translate"; // 번역 함수 추가
import { useI18n } from "vue-i18n";
import { useMemberStore } from "../../stores/member";
const { t } = useI18n(); // 번역 함수 추가
const props = defineProps({
  reservation: Object,
});

const isUpdateMode = ref(false);
const isNewReviewMode = ref(false);
const reviewInfo = ref(null);
const newReviewContent = ref("");
const memberStore = useMemberStore();
// 리뷰와 예약 데이터 번역 함수
const translateReservationData = async (reservation) => {
  if (reservation) {
    reservation.title = await translateWithChatGPT(reservation.title); // 패키지 제목 번역
    reservation.guidName = await translateWithChatGPT(reservation.guidName); // 가이드 이름 번역
    if (reservation.myReview && reservation.myReview.reviewContent) {
      reservation.myReview.reviewContent = await translateWithChatGPT(
        reservation.myReview.reviewContent
      ); // 리뷰 내용 번역
    }
  }
};

// 예약 데이터 변경 시 번역 실행
watch(
  () => props.reservation,
  async (newReservation) => {
    if (newReservation) {
      await translateReservationData(newReservation); // 예약 데이터 번역
      if (newReservation.myReview) {
        reviewInfo.value = {
          reservationId: newReservation.myReview.reservationId,
          reviewContent: newReservation.myReview.reviewContent,
          reviewScore: newReservation.myReview.reviewScore,
        };
      } else {
        reviewInfo.value = null;
      }
    }
  },
  { immediate: true }
);

const clickDelete = async () => {
  await deleteReview(props.reservation.reservationId);
  reviewInfo.value = null; // 리뷰 삭제 후, 리뷰 정보 초기화
};

const clickUpdate = async () => {
  await updateReview({
    reservater: memberStore.memberId,
    ...reviewInfo.value,
  });
  changeMode();
};

const changeMode = () => {
  isUpdateMode.value = !isUpdateMode.value;
};

// 새로운 리뷰 작성 시작
const startNewReview = () => {
  isNewReviewMode.value = true;
};

// 새로운 리뷰 제출
const submitNewReview = async () => {
  // 서버에 새 리뷰 전송 로직
  isNewReviewMode.value = false;
  newReviewContent.value = "";
};

// 새로운 리뷰 작성 취소
const cancelNewReview = () => {
  isNewReviewMode.value = false;
  newReviewContent.value = "";
};
</script>

<style></style>
