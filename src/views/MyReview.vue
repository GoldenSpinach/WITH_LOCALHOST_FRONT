<template>
  <div class="w-full h-full box-border pt-[25px]">
    <h1 class="text-4xl">내가 쓴 리뷰</h1>
    <div class="border w-full my-[15px]"></div>
    <div class="w-full h-[505px] overflow-y-auto flex flex-col gap-[15px]">
      <div
        v-if="reviews.length === 0"
        class="w-full min-h-[120px] box-border px-[15px] py-[10px] border rounded-md"
      >
        <h2 class="text-xl mb-[10px]">
          아직 작성된 리뷰가 없습니다. 리뷰를 작성해보세요!
        </h2>
        <textarea
          v-model="newReviewContent"
          class="w-full border rounded-md p-[10px] mb-[10px]"
          placeholder="리뷰 내용을 입력하세요"
        ></textarea>
        <div class="flex items-center gap-[10px]">
          <span>평점:</span>
          <input
            type="number"
            v-model="newReviewScore"
            min="0"
            max="5"
            step="0.5"
            class="border rounded-md p-[5px] w-[80px]"
          />
        </div>
        <button
          @click="clickSubmit"
          class="mt-[15px] bg-blue-500 text-white p-[10px] rounded-md hover:bg-blue-600"
        >
          리뷰 작성
        </button>
      </div>
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="border w-full min-h-[120px] box-border px-[15px] py-[5px] flex flex-col"
      >
        <div class="flex justify-between">
          <div class="flex gap-[5px]">
            <img
              src="@/assets/images/default_profile_small.svg"
              alt="기본프로필"
            />
            <span class="text-xl">{{ review.userId }}</span>
          </div>
          <span class="text-sm text-slate-400">{{
            new Date(review.date).toISOString().split("T")[0]
          }}</span>
        </div>
        <div
          v-if="!isUpdateMode"
          class="w-full max-w-[800px] truncate mt-[5px] px-[15px] py-[10px]"
        >
          {{ review.reviewContent }}
        </div>
        <input
          v-else
          :value="review.reviewContent"
          class="w-4/5 border rounded-md px-[15px] py-[10px]"
        />
        <div class="self-end flex h-[30px]">
          <template v-if="!isUpdateMode">
            <div class="flex items-center justify-start w-full">
              <img class="w-[24px]" src="@/assets/images/star.svg" alt="" />
              <span class="mt-[2px] text-center">{{
                review.reviewScore.toFixed(1)
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
              @click="clickDelete(review.reservationId)"
            />
          </template>
          <template v-else>
            <div class="flex items-center justify-start w-full gap-[5px]">
              <button
                class="px-[15px]"
                @click="clickUpdate(review.reservationId)"
              >
                완료
              </button>
              <button class="px-[15px]" @click="changeMode()">취소</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import {
  getReviews,
  deleteReview,
  updateReview,
  submitReview,
} from "@/api/member";

const reviews = ref([]);
const isUpdateMode = ref(false);

// 새 리뷰를 위한 데이터
const newReviewContent = ref("");
const newReviewScore = ref(0);

onMounted(async () => {
  const tmp = "minji123";
  reviews.value = await getReviews(tmp);
});

const clickDelete = async (reviewId) => {
  console.log("삭제", reviewId);
  // const res = await deleteReview(reviewId);
};
const clickUpdate = async (reviewId) => {
  console.log("수정", reviewId);
  const res = await updateReview(reviewId);
  changeMode();
};
const changeMode = () => {
  isUpdateMode.value = !isUpdateMode.value;
};

// 새 리뷰 작성 기능
const clickSubmit = async () => {
  if (
    newReviewContent.value.trim() === "" ||
    newReviewScore.value < 0 ||
    newReviewScore.value > 5
  ) {
    alert("리뷰 내용과 유효한 평점을 입력하세요.");
    return;
  }

  const newReview = {
    content: newReviewContent.value,
    score: newReviewScore.value,
    userId: "minji123", // 실제 사용자 ID로 대체
  };

  await submitReview(newReview);
  reviews.value.push(newReview);
  newReviewContent.value = "";
  newReviewScore.value = 0;
};
</script>
<style></style>
