<template>
  <div class="w-full flex justify-center items-center">
    <div class="border-t"></div>
    <section class="w-5/6 h-[700px] border rounded-lg box-border p-[25px]">
      <div class="flex w-full h-full pt-[45px] box-border">
        <div class="w-1/4 flex flex-col items-center gap-[15px]">
          <img src="@/assets/images/default_profile.svg" alt="프로필사진" />
          <button
            class="bg-blue-400 w-3/6 text-white h-[35px] rounded-lg cursor-pointer"
          >
            관광객 전환
          </button>
          <div class="border-b w-5/6"></div>
          <div class="w-5/6">
            <ul class="flex flex-col gap-[15px]">
              <RouterLink to="/mypage">예약 내역</RouterLink>
              <RouterLink to="/mypage/review">내가 쓴 리뷰</RouterLink>
            </ul>
          </div>
        </div>
        <div class="h-full border me-[25px]"></div>
        <RouterView />
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style></style>
