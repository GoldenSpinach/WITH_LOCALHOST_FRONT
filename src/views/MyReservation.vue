<template>
  <div class="w-full h-full box-border pt-[25px]">
    <h1 class="text-4xl">예약 내역</h1>
    <div class="border w-full my-[15px]"></div>
    <div class="w-full h-[505px] overflow-y-auto">
      <div>
        <div class="w-1/2 border h-[200px] rounded-lg flex">
          <img
            class="h-full w-1/3"
            src="@/assets/images/default.png"
            alt="패키지사진"
          />
          <div class="w-2/3 flex flex-col">
            <h3 class="w-full block box-border p-[5px] text-lg truncate">
              해병대와함께해asdfasdfasdfasdfsadfsaas
            </h3>
            <div class="flex gap-[5px] items-center h-[24px] mt-[5px]">
              <img
                src="@/assets/images/default_profile_small.svg"
                alt="프로필사진"
              />
              <span>구보가너무좋아해병</span>
            </div>
            <div class="flex items-center justify-start w-full mt-[5px]">
              <img src="@/assets/images/star.svg" alt="" /><span
                class="text-center"
                >3.24</span
              >
            </div>
            <button
              class="border w-1/2 cursor-pointer self-end bg-blue-400 text-white rounded-lg self-end mt-[65px] me-[10px]"
            >
              예약완료
            </button>
            <!-- <button>예약대기</button>
          <button>예약취소</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style></style>
