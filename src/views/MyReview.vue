<template>
  <div class="w-full h-full box-border pt-[25px]">
    <h1 class="text-4xl">내가 쓴 리뷰</h1>
    <div class="border w-full my-[15px]"></div>
    <div class="w-full h-[505px] overflow-y-auto flex flex-col gap-[15px]">
      <div
        class="border w-full h-[100px] box-border px-[15px] py-[5px] flex flex-col"
      >
        <div class="flex justify-between">
          <div class="flex gap-[5px]">
            <img
              src="@/assets/images/default_profile_small.svg"
              alt="기본프로필"
            />
            <span class="text-xl">구보는 너무좋아해병</span>
          </div>
          <span class="text-sm text-slate-400">2022.02.22</span>
        </div>
        <div class="w-full max-w-[800px] truncate mt-[5px]">
          100% 강추합니다100% 강추합니다100% 강추합니다100% 강추합니다100%
          강추합니다100% 강추합니다100% 강추합니다100% 강추합니다100%
          강추합니다100% 강추합니다100% 강추합니다100% 강추합니다100%
          강추합니다100% 강추합니다100% 강추합니다100% 강추합니다100%
          강추합니다100% 강추합니다100% 강추합니다100% 강추합니다100%
          강추합니다100% 강추합니다100% 강추합니다100% 강추합니다100%
          강추합니다100% 강추합니다
        </div>
        <div class="self-end flex h-[30px]">
          <div class="flex items-center justify-start w-full">
            <img class="w-[24px]" src="@/assets/images/star.svg" alt="" />
            <span class="mt-[2px] text-center">3.24</span>
          </div>
          <img
            class="w-[30px] cursor-pointer"
            src="@/assets/images/trashcan.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style></style>
