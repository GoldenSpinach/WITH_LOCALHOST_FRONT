<template>
  <div class="flex w-full p-2">
    <div class="w-full bg-white shadow-md rounded-lg p-4">
      <!-- 예약 정보 -->
      <div class="mb-4">
        <span class="text-xl text-slate-600 font-semibold">
          {{ new Date(reservation.startDate).toISOString().split("T")[0] }}
        </span>
        <div
          class="w-full border h-[400px] rounded-lg flex mt-4 overflow-hidden"
        >
          <img
            class="h-full w-1/4 object-cover rounded-lg"
            src="@/assets/images/default.png"
            alt="패키지사진"
          />
          <div class="w-3/4 flex flex-col h-full justify-between p-3">
            <div>
              <h3 class="text-lg font-bold text-gray-800 truncate">
                {{ reservation.title }}
              </h3>
              <div class="flex items-center gap-3 mt-2">
                <img
                  src="@/assets/images/default_profile_small.svg"
                  class="w-6 h-6 rounded-full"
                  alt="프로필사진"
                />
                <span class="text-base text-gray-600">{{
                  reservation.guidName
                }}</span>
              </div>
            </div>

            <!-- 리뷰 작성/수정 -->
            <template v-if="reviewInfo">
              <div class="flex flex-col gap-3 mt-3">
                <div v-if="!isUpdateMode" class="bg-gray-100 p-3 rounded-lg">
                  <p class="text-sm text-gray-800">
                    {{ reviewInfo.reviewContent }}
                  </p>
                </div>
                <textarea
                  v-else
                  v-model="reviewInfo.reviewContent"
                  class="w-full border h-24 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-500"
                  placeholder="{{ t('리뷰 내용을 입력하세요') }}"
                ></textarea>
                <StarRate v-model="rating" @rating-selected="setRating" />
                <div class="self-end flex gap-2">
                  <template v-if="!isUpdateMode">
                    <button
                      class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                      @click="changeMode()"
                    >
                      <img
                        src="@/assets/images/pen.svg"
                        alt=""
                        class="w-4 h-4 mr-1"
                      />
                      {{ t("리뷰 수정") }}
                    </button>
                    <button
                      class="flex items-center text-red-500 hover:text-red-700 transition-colors"
                      @click="clickDelete()"
                    >
                      <img
                        src="@/assets/images/trashcan.svg"
                        alt=""
                        class="w-4 h-4 mr-1"
                      />
                      {{ t("삭제") }}
                    </button>
                  </template>
                  <template v-else>
                    <button
                      class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                      @click="clickUpdate()"
                    >
                      {{ t("완료") }}
                    </button>
                    <button
                      class="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition-all"
                      @click="changeMode()"
                    >
                      {{ t("취소") }}
                    </button>
                  </template>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="mt-3">
                <div
                  v-if="!isNewReviewMode"
                  class="text-base text-gray-500 flex items-center justify-between"
                >
                  <span>{{ t("아직 리뷰를 작성하지 않았어요") }}</span>
                  <button
                    @click="startNewReview()"
                    class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                  >
                    {{ t("리뷰 작성") }}
                  </button>
                </div>
                <div v-if="isNewReviewMode" class="flex flex-col gap-3 mt-3">
                  <textarea
                    v-model="newReviewContent"
                    class="w-full border h-24 rounded-md p-3 resize-none focus:outline-none focus:border-blue-500"
                    placeholder="{{ t('리뷰 내용을 입력하세요') }}"
                  ></textarea>
                  <StarRate v-model="rating" @rating-selected="setRating" />
                  <div class="flex gap-2 mt-2">
                    <button
                      class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                      @click="submitNewReview()"
                    >
                      {{ t("리뷰 제출") }}
                    </button>
                    <button
                      class="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition-all"
                      @click="cancelNewReview()"
                    >
                      {{ t("취소") }}
                    </button>
                  </div>
                </div>
              </div>
            </template>

            <!-- 예약 상태 표시 -->
            <div class="self-end mt-3">
              <button
                v-if="reservation.reservationStatus === 'A'"
                class="px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
              >
                {{ t("예약완료") }}
              </button>
              <button
                v-else-if="reservation.reservationStatus === 'P'"
                class="px-3 py-1 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition-all"
              >
                {{ t("예약대기") }}
              </button>
              <button
                v-else
                class="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
              >
                {{ t("예약취소") }}
              </button>
            </div>
          </div>
        </div>
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
import StarRate from "../starRating/StarRate.vue";
const rating = ref(0);
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
        rating.value = newReservation.myReview.reviewScore;
      } else {
        reviewInfo.value = null;
        rating.value = 0;
      }
    }
  },
  { immediate: true }
);

const clickDelete = async () => {
  await deleteReview(props.reservation.reservationId);
  reviewInfo.value = null; // 리뷰 삭제 후, 리뷰 정보 초기화
  rating.value = 0;
};

const clickUpdate = async () => {
  await updateReview({
    reservater: memberStore.memberId,
    ...reviewInfo.value,
    reviewScore: rating.value,
  });
  changeMode();
};

const setRating = (newRating) => {
  rating.value = newRating;
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
  rating.value = 0;
};
</script>

<style scoped>
/* 추가 스타일이 필요한 경우 여기에 작성 */
</style>
