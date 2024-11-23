<template>
  <div class="w-full h-full box-border pt-[25px]">
    <h1 class="text-4xl">내가 쓴 리뷰</h1>
    <div class="border w-full my-[15px]"></div>
    <div class="w-full h-[505px] overflow-y-auto flex flex-col gap-[15px]">
      <div
        class="border w-full min-h-[120px] box-border px-[15px] py-[5px] flex flex-col"
      >
        <div class="flex justify-between">
          <div class="flex gap-[5px]">
            <img
              src="@/assets/images/default_profile_small.svg"
              alt="기본프로필"
            />
            <span class="text-xl">유저아이디를 불러와야해</span>
          </div>
          <span class="text-sm text-slate-400">{{}}</span>
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
import { getReviews, deleteReview, updateReview } from "@/api/member";

const reviews = ref([]);
const isUpdateMode = ref(false);

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
</script>
<style></style>
